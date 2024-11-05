import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthScreen from "./screens/AuthScreen";
import FlightsScreen from "./screens/FlightsScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotificationSettingsScreen from "./screens/NotificationSettingsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Вложенный таб навигатор для вкладок
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Главная" }}
      />
      <Tab.Screen
        name="Flights"
        component={FlightsScreen}
        options={{ title: "Рейсы" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Профиль" }}
      />
    </Tab.Navigator>
  );
}

// Основной стек навигации
function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ title: "Аутентификация" }}
      />
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationSettingsScreen"
        component={NotificationSettingsScreen}
        options={{ title: "Настройки уведомлений" }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
