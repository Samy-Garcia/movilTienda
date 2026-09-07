// src/components/ProductCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../style/colors";
import { typography } from "../style/typography";

export default function ProductCard({ producto, onPress }) {
  return (
    <TouchableOpacity style={styles.tarjeta} onPress={onPress} activeOpacity={0.85}>
      <Image
        source={{ uri: producto.imagenUrl }}
        style={styles.imagen}
        resizeMode="cover"
      />
      <Text style={styles.nombre} numberOfLines={1}>
        {producto.nombre?.toUpperCase()}
      </Text>
      <Text style={styles.precio}>${producto.precio}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    width: "48%",
    marginBottom: 20,
  },
  imagen: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
    marginBottom: 8,
  },
  nombre: {
    ...typography.caption,
    fontWeight: "700",
    color: colors.black,
  },
  precio: {
    ...typography.caption,
    color: colors.mediumGray,
    marginTop: 2,
  },
});
