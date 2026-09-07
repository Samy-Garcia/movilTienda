// src/screens/Auth/PasswordSuccessScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../../components/PrimaryButton";
import { globalStyles } from "../../style/globalStyles";
import { typography } from "../../style/typography";
import { colors } from "../../style/colors";

export default function PasswordSuccessScreen({ navigation }) {
  return (
    <View style={globalStyles.centeredContainer}>
      <View style={styles.circuloIcono}>
        <Ionicons name="phone-portrait-outline" size={36} color={colors.black} />
        <View style={styles.checkBadge}>
          <Ionicons name="checkmark" size={14} color={colors.white} />
        </View>
      </View>

      <Text style={styles.titulo}>Tu contraseña ha sido cambiada.</Text>
      <Text style={styles.subtitulo}>¡Bienvenido de nuevo! ¡Descúbrelo ahora!</Text>

      <View style={styles.espacio} />

      <PrimaryButton
        titulo="listo"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circuloIcono: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  checkBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: colors.black,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    ...typography.titleMedium,
    textAlign: "center",
    marginBottom: 8,
    paddingHorizontal: 30,
  },
  subtitulo: {
    ...typography.body,
    color: colors.mediumGray,
    textAlign: "center",
  },
  espacio: { height: 30, width: "80%" },
});
