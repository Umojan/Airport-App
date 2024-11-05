import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QrScreen = () => {
  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code</Text>

      {/* Генерация QR-кода */}
      {showQRCode ? (
        <View style={styles.qrContainer}>
          <QRCode value="Ваш текст или данные для QR-кода" size={200} />
          <Button title="Скрыть QR-код" onPress={() => setShowQRCode(false)} />
        </View>
      ) : (
        <Button title="Показать мой QR-код" onPress={() => setShowQRCode(true)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f8',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default QrScreen;
