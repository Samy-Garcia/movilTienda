// src/screens/SplashScreen.js
// Pantalla de carga adicional (cumple el requisito de splash screen
// personalizado más allá del splash por defecto de Expo).
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../style/colors";
import { typography } from "../style/typography";

export default function SplashScreen() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.logo}>LØØM &amp; WEFT</Text>
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
    ...typography.titleLarge,
    color: colors.white,
    letterSpacing: 2,
  },
  loader: {
    marginTop: 20,
  },
});
