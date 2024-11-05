import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import * as Notifications from "expo-notifications";

const FlightsScreen = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  useEffect(() => {
    const sendNotification = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          console.log("Permission not granted for notifications");
          return;
        }
      }

      if (notificationEnabled) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Напоминание",
            body: "У вас осталось 2 часа до рейса!",
          },
          trigger: {
            seconds: 7200,
          },
        });
      }
    };

    sendNotification();
  }, [notificationEnabled]);

  const toggleNotifications = () => {
    setNotificationEnabled((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Табло рейсов</Text>
      <WebView
        source={{ uri: "http://www.airport.kg/bishkek/schedule" }}
        style={styles.webview}
      />
      <View style={styles.notificationSection}>
        <Button
          title={
            notificationEnabled
              ? "Выключить уведомления"
              : "Включить уведомления"
          }
          onPress={toggleNotifications}
        />
        <Text style={styles.notificationStatus}>
          Уведомления {notificationEnabled ? "включены" : "выключены"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  webview: { flex: 1, borderRadius: 10 },
  notificationSection: { marginTop: 20, alignItems: "center" },
  notificationStatus: { marginTop: 10, fontSize: 16 },
});

export default FlightsScreen;
