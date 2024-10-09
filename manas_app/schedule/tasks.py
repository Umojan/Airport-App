import logging
import requests
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
from .models import Flight

logger = logging.getLogger('schedule_logger')

def fetch_flight_data():
    # URL для запроса
    url = 'http://www.airport.kg/changeDepTable'

    # Заголовки запроса
    headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': '_ga=GA1.2.604240109.1728230250; _gid=GA1.2.1774912959.1728230250; astratop=1; locale=eyJpdiI6InNMS3NuT2RJblNZK3FPOUU3YVg2N0E9PSIsInZhbHVlIjoiZzJRUzVVNnVnRTRrYzFKXC9EeGw5Qnc9PSIsIm1hYyI6ImRmZWJlODVlNzY5MTdkY2M2NWVhNjQ0MTIzYjk4NjU5OTMxM2ZhZjRmNzUxODMxZGZmN2JjN2RhM2FjZjZiNGIifQ%3D%3D; _ga_SRLG0J4MHN=GS1.2.1728416178.8.1.1728416452.30.0.0; XSRF-TOKEN=eyJpdiI6IlZMM1VCWFJyTFdEV3hrdFYxbTBlVWc9PSIsInZhbHVlIjoiWG5ROU5ndGdObFFSd2ZsV2FuNUtaeUlCZ2tnOTJEMXdxZGtGMmp3VDdZV3FWRmlSYjF6TXVVcHA3UEZDSlFWd0ROSndBNG9pS1dVelc1alIwajhnZFE9PSIsIm1hYyI6IjJjMWIzZWNiOWQ0ZDdmODM2YWYxMzQ3ZTMwOGRmMmFkODc0MTk2OWVlMDRkMGIwMTY2NzliYTk3NWY3NjBjZmEifQ%3D%3D; laravel_session=eyJpdiI6IlRMZXVTcmhqWHArdVhUZjJsbTE4VWc9PSIsInZhbHVlIjoiTFpUb1hId2JDbFl0RmZZSDJ5Zk14S0NWYVpETmdzY0RDU3NWaTc3SVlxeFQ4Um50RGxwd1pZbmF0WEpkK0MzeERSRDVtTkhyd0dkeERUOTg1dDlrU1E9PSIsIm1hYyI6IjkxM2QzOTBjYzliZDQ1MGYyYjA0N2ZjZmU2NjM5MjIxNzkwOTlmOTU1MDRhZjMxZThhYWE0MTUwYmY2MjFiMjkifQ%3D%3D; _gat=1',
        'Host': 'www.airport.kg',
        'Origin': 'http://www.airport.kg',
        'Pragma': 'no-cache',
        'Referer': 'http://www.airport.kg/schedule',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        'X-CSRF-Token': 'KzEPaM6hpDlm6MptAyzOeWRrB2EbpTteinkS3jDC',
        'X-Requested-With': 'XMLHttpRequest'
    }

    try:
        logger.info("Starting flight data collection...")
        html_response = ''
        days_count = 2  # кол-во дней за которые берем рейсы

        for i_days in range(days_count):
            date = (datetime.now() + timedelta(days=i_days)).strftime("%d.%m.%y")
            data = f'date={date}&full=1&prefix='

            logger.debug(f"Fetching data for date: {date}")

            # Выполнение POST-запроса
            response = requests.post(url, headers=headers, data=data)

            if response.status_code == 200:
                logger.info(f"Data successfully retrieved for {date}")
            else:
                raise Exception(f'Failed to retrieve data for {date}, status code: {response.status_code}')

            response.encoding = 'utf-8'
            html_response += response.text

        soup = BeautifulSoup(html_response, 'html.parser')
        flights = soup.find_all('div', class_='m-row')

        logger.debug(f"Found {len(flights)} flights")

        Flight.objects.all().delete()  # Удаляем старые данные перед обновлением

        for flight in flights:
            flight_elements = flight.find_all('div')

            Flight.objects.create(
                img=flight.find('img')['src'],
                flight=flight_elements[1].text.strip(),
                destination=flight_elements[2].text.strip(),
                planned_date=datetime.strptime(flight_elements[3].text.strip(), '%d.%m.%y').date(),
                planned_time=datetime.strptime(flight_elements[4].text.strip().replace('.', ':'), '%H:%M').time(),
                status=flight_elements[5].text.strip()
            )

        logger.info("Flight data collection completed successfully")

    except Exception as e:
        logger.error(f"An error occurred: {e}")
