// src/navigation/RootNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import SplashScreen from "../screens/SplashScreen";

export default function RootNavigator({ onReady }) {
  const { cargandoSesion, estaAutenticado } = useAuth();

  if (cargandoSesion) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer onReady={onReady}>
      {estaAutenticado ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
