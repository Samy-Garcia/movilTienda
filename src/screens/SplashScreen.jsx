// src/screens/SplashScreen.js
// Pantalla de carga adicional (cumple el requisito de splash screen
// personalizado más allá del splash por defecto de Expo).
import React from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../style/colors";

export default function SplashScreen() {
  return (
    <View style={styles.contenedor}>
      <Image
        source={require("../../assets/logo.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="small" color={colors.white} style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  loader: {
    marginTop: 20,
  },
});
