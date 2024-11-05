import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation, route }) => {
  const { userData } = route.params || { userData: {} }; // Обработка параметров безопасности

  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: userData.name || "",
    password: userData.password || "",
    email: userData.email || "",
  });

  useEffect(() => {
    if (userData) {
      setUserProfile({
        name: userData.name || "",
        password: userData.password || "",
        email: userData.email || "",
      });
    }
  }, [userData]);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev); // Предыдущий состояние в функцию
  };

  const handleSave = () => {
    setIsEditing(false);
    // Здесь можно добавить логику для сохранения данных
  };

  const handleLogout = () => {
    navigation.navigate("AuthScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={100} color="gray" />
        <Text style={styles.username}>{userProfile.name || ""}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Имя</Text>
        <TextInput
          style={styles.input}
          value={userProfile.name}
          editable={isEditing}
          onChangeText={
            (text) => setUserProfile((prev) => ({ ...prev, name: text })) // Обновление с использованием предыдущего состояния
          }
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={userProfile.email}
          editable={isEditing}
          onChangeText={(text) =>
            setUserProfile((prev) => ({ ...prev, email: text }))
          }
        />

        <Text style={styles.label}>Пароль</Text>
        <TextInput
          style={styles.input}
          value={userProfile.password}
          editable={isEditing}
          onChangeText={(text) =>
            setUserProfile((prev) => ({ ...prev, password: text }))
          }
          secureTextEntry // Защита поля пароля
        />
      </View>

      <View style={styles.buttonsSection}>
        {isEditing ? (
          <Button title="Сохранить" onPress={handleSave} />
        ) : (
          <Button title="Редактировать профиль" onPress={toggleEdit} />
        )}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f8",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoSection: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: "gray",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 18,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  buttonsSection: {
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 15,
    alignItems: "center",
  },
  logoutText: {
    color: "red",
    fontSize: 16,
  },
});

export default ProfileScreen;
