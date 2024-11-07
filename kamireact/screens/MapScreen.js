import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const MapScreen = () => {
  const [loading, setLoading] = useState(true); // Состояние для индикации загрузки
  const [error, setError] = useState(false); // Состояние для обработки ошибок

  const mapUrl =
    "https://2gis.kg/bishkek/firm/70000001019319368/74.46953%2C43.054254?floor=0&m=74.469618%2C43.054219%2F18.56%2Fp%2F1.83%2Fr%2F10.94";

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Загрузка карты...</Text>
        </View>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Не удалось загрузить карту</Text>
        </View>
      )}
      <WebView
        source={{ uri: mapUrl }}
        style={{ flex: 1 }}
        startInLoadingState={true}
        javaScriptEnabled={true}
        onLoad={() => setLoading(false)} // Убираем индикатор при загрузке
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#2196F3",
  },
  errorContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default MapScreen;
