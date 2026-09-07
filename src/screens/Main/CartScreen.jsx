// src/screens/Main/CartScreen.js
import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CartItemCard from "../../components/CartItemCard";
import PrimaryButton from "../../components/PrimaryButton";
import { useCart } from "../../hooks/useCart";
import { globalStyles } from "../../style/globalStyles";
import { typography } from "../../style/typography";
import { colors } from "../../style/colors";

export default function CartScreen({ navigation }) {
  const { items, total, incrementarCantidad, decrementarCantidad, eliminarDelCarrito } =
    useCart();

  function manejarCheckout() {
    // TODO: Conectar con el endpoint real de creación de pedido.
    Alert.alert("Checkout", "Esta funcionalidad se conectará más adelante con la API.");
  }

  return (
    <View style={globalStyles.screenContainerNoPadding}>
      <View style={styles.encabezado}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={typography.titleMedium}>Carrito</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(_, indice) => String(indice)}
        contentContainerStyle={styles.lista}
        renderItem={({ item, index }) => (
          <CartItemCard
            item={item}
            onIncrementar={() => incrementarCantidad(index)}
            onDecrementar={() => decrementarCantidad(index)}
            onEliminar={() => eliminarDelCarrito(index)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.vacioTexto}>Tu carrito está vacío.</Text>
        }
      />

      {items.length > 0 && (
        <View style={styles.resumen}>
          <View style={styles.filaResumen}>
            <Text style={typography.body}>Precio del producto</Text>
            <Text style={typography.body}>${total.toFixed(2)}</Text>
          </View>
          <View style={styles.filaResumen}>
            <Text style={typography.body}>Envío</Text>
            <Text style={typography.body}>Envío gratuito</Text>
          </View>
          <View style={styles.filaResumen}>
            <Text style={typography.bodyBold}>Total</Text>
            <Text style={typography.bodyBold}>${total.toFixed(2)}</Text>
          </View>

          <View style={styles.espacio} />
          <PrimaryButton titulo="Proceed to checkout" onPress={manejarCheckout} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    marginBottom: 12,
  },
  lista: { paddingHorizontal: 20 },
  vacioTexto: { textAlign: "center", color: colors.mediumGray, marginTop: 40 },
  resumen: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  filaResumen: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  espacio: { height: 12 },
});
