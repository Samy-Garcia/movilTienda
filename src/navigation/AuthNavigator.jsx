// src/navigation/AuthNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import VerifyCodeScreen from "../screens/Auth/VerifyCodeScreen";
import NewPasswordScreen from "../screens/Auth/NewPasswordScreen";
import PasswordSuccessScreen from "../screens/Auth/PasswordSuccessScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="PasswordSuccess" component={PasswordSuccessScreen} />
    </Stack.Navigator>
  );
}
