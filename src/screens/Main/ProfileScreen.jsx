// src/screens/Main/ProfileScreen.js
// NOTA: Pantalla temporal. Reemplazar el diseño cuando tengan el mockup
// de perfil en Figma.
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../../components/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { globalStyles } from "../../style/globalStyles";
import { typography } from "../../style/typography";
import { colors } from "../../style/colors";

export default function ProfileScreen() {
  const { usuario, cerrarSesion } = useAuth();

  return (
    <View style={globalStyles.screenContainer}>
      <View style={styles.espacioSuperior} />
      <View style={styles.avatar}>
        <Ionicons name="person-outline" size={40} color={colors.white} />
      </View>

      <Text style={typography.titleMedium}>
        {usuario ? `${usuario.name} ${usuario.lastName || ""}`.trim() : "Usuario"}
      </Text>
      <Text style={styles.correo}>{usuario?.email || ""}</Text>

      <View style={styles.espacio} />
      <PrimaryButton titulo="CERRAR SESIÓN" onPress={cerrarSesion} />
    </View>
  );
}

const styles = StyleSheet.create({
  espacioSuperior: { height: 40 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  correo: { color: colors.mediumGray, marginTop: 4, marginBottom: 20 },
  espacio: { height: 30 },
});
