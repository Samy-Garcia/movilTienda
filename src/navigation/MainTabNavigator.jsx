// src/navigation/MainTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/Main/HomeScreen";
import SearchScreen from "../screens/Main/SearchScreen";
import CartScreen from "../screens/Main/CartScreen";
import ProfileScreen from "../screens/Main/ProfileScreen";
import { colors } from "../style/colors";

const Tab = createBottomTabNavigator();

const ICONOS_TAB = {
  Home: "home-outline",
  Search: "search-outline",
  Cart: "bag-outline",
  Profile: "person-outline",
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.mediumGray,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICONOS_TAB[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
