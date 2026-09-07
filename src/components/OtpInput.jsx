// src/components/OtpInput.js
import React, { useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { colors } from "../style/colors";

const LONGITUD_CODIGO = 4;

export default function OtpInput({ codigo, onChangeCodigo }) {
  const referencias = useRef([]);

  function manejarCambio(texto, indice) {
    const digitos = codigo.split("");
    digitos[indice] = texto.slice(-1);
    const nuevoCodigo = digitos.join("").slice(0, LONGITUD_CODIGO);
    onChangeCodigo(nuevoCodigo);

    if (texto && indice < LONGITUD_CODIGO - 1) {
      referencias.current[indice + 1]?.focus();
    }
  }

  function manejarBorrado(evento, indice) {
    if (evento.nativeEvent.key === "Backspace" && !codigo[indice] && indice > 0) {
      referencias.current[indice - 1]?.focus();
    }
  }

  return (
    <View style={styles.fila}>
      {Array.from({ length: LONGITUD_CODIGO }).map((_, indice) => (
        <TextInput
          key={indice}
          ref={(ref) => (referencias.current[indice] = ref)}
          style={styles.casilla}
          maxLength={1}
          keyboardType="number-pad"
          value={codigo[indice] || ""}
          onChangeText={(texto) => manejarCambio(texto, indice)}
          onKeyPress={(evento) => manejarBorrado(evento, indice)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 14,
    marginVertical: 24,
  },
  casilla: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    textAlign: "center",
    fontSize: 20,
    color: colors.black,
  },
});
