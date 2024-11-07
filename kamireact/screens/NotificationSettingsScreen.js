import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";

const NotificationSettingsScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        alert("Permission not granted for notifications");
        return;
      }
    }
  };

  const scheduleNotification = async () => {
    const triggerTime = new Date(date);
    triggerTime.setSeconds(0); // Убедитесь, что секунды равны 0 для точности

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Напоминание",
        body: "У вас осталось 2 часа до рейса!",
      },
      trigger: {
        hour: triggerTime.getHours(),
        minute: triggerTime.getMinutes(),
        repeats: false, // Вы можете изменить это на true, если хотите, чтобы уведомление повторялось
      },
    });

    alert("Уведомление запланировано на " + triggerTime.toLocaleTimeString());
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Настройка уведомлений</Text>
      <Button
        title="Выбрать время уведомления"
        onPress={() => setShowPicker(true)}
      />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={onChange}
        />
      )}
      <Button title="Напомнить" onPress={scheduleNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
});

export default NotificationSettingsScreen;
