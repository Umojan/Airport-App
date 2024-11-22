# Django Manas App

## Пути
 - .../admin
 - .../api/info-banners/
 - .../api/flights/

## Админка
#### login: admin
#### password: admin

# Flight Schedule:
#### http://localhost:8000/api/flights/schedule/
Показывает список рейсов

## Данные:
 - is_arrival (bool)
 - airline (text)
 - flight_code (text)
 - city (text)
 - time (date)
 - status (text)

## Фильтры в запросе:
### Пример:
http://localhost:8000/api/flights/schedule/?end_time=2024-11-08T08%3A45%3A00Z&is_arrival=1&ordering=time&start_time=2024-11-07T09%3A45%3A00Z
#### Показывает все прилетающие рейсы с 2024-11-07 09:45:00 до 2024-11-08 08:45:00 по возрастанию.

### Атрибуты http запроса:
- **is_arrival=** (_1_ - True, _0_ - False)
- **ordering=** (_time_ - по возрастанию, _-time_ - по убыванию)
- **start_time=** (с какого времени)
- **end_time=** (по какое время)


