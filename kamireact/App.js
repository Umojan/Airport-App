import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import FlightsScreen from "./screens/FlightsScreen";
import QrScreen from "./screens/QrScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotificationSettingsScreen from "./screens/NotificationSettingsScreen";
import AuthScreen from "./screens/AuthScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AuthScreen" options={{ headerShown: false }}>
        {(props) => <AuthScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Главная") {
            iconName = "home-outline";
          } else if (route.name === "Карта") {
            iconName = "map-outline";
          } else if (route.name === "Рейсы") {
            iconName = "airplane-outline";
          } else if (route.name === "QR") {
            iconName = "qr-code-outline";
          } else if (route.name === "Профиль") {
            iconName = "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="QR" component={QrScreen} />
      <Tab.Screen name="Рейсы" component={FlightsScreen} />
      <Tab.Screen name="Главная" component={HomeScreen} />
      <Tab.Screen name="Карта" component={MapScreen} />
      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        initialParams={{ userData: { name: "", email: "", password: "" } }} // Установка параметров по умолчанию
      />
      <Tab.Screen
        name="NotificationSettings"
        component={NotificationSettingsScreen}
        options={{ tabBarButton: () => null }} // Скрыть кнопку для этого экрана
      />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainStack /> : <AuthStack setIsLoggedIn={setIsLoggedIn} />}
    </NavigationContainer>
  );
}
