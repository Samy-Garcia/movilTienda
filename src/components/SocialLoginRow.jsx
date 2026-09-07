// src/components/SocialLoginRow.js
// NOTA: Estos botones son solo visuales, no implementan OAuth real.
import React from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../style/colors";

const proveedoresSocial = [
  { id: "apple", icono: "logo-apple" },
  { id: "google", icono: "logo-google" },
  { id: "facebook", icono: "logo-facebook" },
];

export default function SocialLoginRow() {
  function manejarPresionSocial(proveedor) {
    Alert.alert(
      "Función no disponible",
      `El inicio de sesión con ${proveedor} no está implementado en esta demo.`
    );
  }

  return (
    <View style={styles.fila}>
      {proveedoresSocial.map((proveedor) => (
        <TouchableOpacity
          key={proveedor.id}
          style={styles.circulo}
          onPress={() => manejarPresionSocial(proveedor.id)}
        >
          <Ionicons name={proveedor.icono} size={20} color={colors.black} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginVertical: 20,
  },
  circulo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
});
