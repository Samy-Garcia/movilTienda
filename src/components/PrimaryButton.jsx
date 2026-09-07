// src/components/PrimaryButton.js
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { colors } from "../style/colors";
import { typography } from "../style/typography";

export default function PrimaryButton({
  titulo,
  onPress,
  cargando = false,
  deshabilitado = false,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.boton,
        (deshabilitado || cargando) && styles.botonDeshabilitado,
      ]}
      onPress={onPress}
      disabled={deshabilitado || cargando}
      activeOpacity={0.8}
    >
      {cargando ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.texto}>{titulo}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: colors.black,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  botonDeshabilitado: {
    opacity: 0.5,
  },
  texto: {
    color: colors.white,
    ...typography.button,
  },
});
