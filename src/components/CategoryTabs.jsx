// src/components/CategoryTabs.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../style/colors";
import { typography } from "../style/typography";

export const CATEGORIAS = ["Mujer", "Hombre", "Accesorios"];

export default function CategoryTabs({ categoriaActiva, onSeleccionar }) {
  return (
    <View style={styles.fila}>
      {CATEGORIAS.map((categoria) => {
        const activa = categoria === categoriaActiva;
        return (
          <TouchableOpacity
            key={categoria}
            style={styles.item}
            onPress={() => onSeleccionar(categoria)}
          >
            <View style={[styles.circulo, activa && styles.circuloActivo]} />
            <Text style={[styles.texto, activa && styles.textoActivo]}>
              {categoria}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  item: {
    alignItems: "center",
  },
  circulo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.lightGray,
    marginBottom: 6,
  },
  circuloActivo: {
    borderColor: colors.black,
  },
  texto: {
    ...typography.caption,
    color: colors.mediumGray,
  },
  textoActivo: {
    color: colors.black,
    fontWeight: "700",
  },
});
