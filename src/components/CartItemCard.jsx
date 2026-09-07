// src/components/CartItemCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../style/colors";
import { typography } from "../style/typography";

export default function CartItemCard({ item, onIncrementar, onDecrementar, onEliminar }) {
  return (
    <View style={styles.contenedor}>
      <Image source={{ uri: item.imagenUrl }} style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.precio}>${item.precio.toFixed(2)}</Text>
        <Text style={styles.detalle}>
          Size: {item.talla} | Color: {item.color}
        </Text>
      </View>
      <View style={styles.controles}>
        <TouchableOpacity onPress={onEliminar}>
          <Ionicons name="checkmark-circle" size={22} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.selectorCantidad}>
          <TouchableOpacity onPress={onDecrementar}>
            <Text style={styles.botonCantidad}>-</Text>
          </TouchableOpacity>
          <Text style={styles.cantidad}>{item.cantidad}</Text>
          <TouchableOpacity onPress={onIncrementar}>
            <Text style={styles.botonCantidad}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    marginBottom: 20,
  },
  imagen: {
    width: 64,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nombre: {
    ...typography.bodyBold,
  },
  precio: {
    ...typography.body,
    marginTop: 4,
  },
  detalle: {
    ...typography.caption,
    color: colors.mediumGray,
    marginTop: 4,
  },
  controles: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  selectorCantidad: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 10,
  },
  botonCantidad: {
    fontSize: 16,
    fontWeight: "700",
  },
  cantidad: {
    fontSize: 14,
    fontWeight: "600",
  },
});
