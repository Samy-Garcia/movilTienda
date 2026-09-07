// src/screens/Main/ProductDetailScreen.js
// NOTA: Pantalla temporal. Reemplazar el diseño cuando tengan el mockup
// de detalle de producto en Figma. Por ahora permite agregar al carrito
// para poder demostrar el flujo completo.
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../../components/PrimaryButton";
import { useCart } from "../../hooks/useCart";
import { globalStyles } from "../../style/globalStyles";
import { typography } from "../../style/typography";
import { colors } from "../../style/colors";

const TALLAS = ["S", "M", "L"];

export default function ProductDetailScreen({ navigation, route }) {
  const { producto } = route.params;
  const { agregarAlCarrito } = useCart();
  const [tallaSeleccionada, setTallaSeleccionada] = useState("M");

  function manejarAgregarAlCarrito() {
    agregarAlCarrito(producto, tallaSeleccionada, producto.color || "N/A");
    Alert.alert("Agregado", `${producto.nombre} se agregó al carrito.`);
  }

  return (
    <View style={globalStyles.screenContainerNoPadding}>
      <TouchableOpacity style={styles.botonAtras} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={26} color={colors.black} />
      </TouchableOpacity>

      <Image source={{ uri: producto.imagenUrl }} style={styles.imagen} />

      <View style={styles.contenido}>
        <Text style={typography.titleMedium}>{producto.nombre}</Text>
        <Text style={styles.precio}>${producto.precio}</Text>

        <Text style={[typography.bodyBold, styles.espacioArriba]}>Talla</Text>
        <View style={styles.filaTallas}>
          {TALLAS.map((talla) => (
            <TouchableOpacity
              key={talla}
              style={[styles.talla, talla === tallaSeleccionada && styles.tallaActiva]}
              onPress={() => setTallaSeleccionada(talla)}
            >
              <Text
                style={[
                  styles.tallaTexto,
                  talla === tallaSeleccionada && styles.tallaTextoActivo,
                ]}
              >
                {talla}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.espacioArriba}>
          <PrimaryButton titulo="AGREGAR AL CARRITO" onPress={manejarAgregarAlCarrito} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  botonAtras: { paddingHorizontal: 20, paddingTop: 16 },
  imagen: {
    width: "100%",
    height: 320,
    backgroundColor: colors.lightGray,
    marginTop: 12,
  },
  contenido: { padding: 20 },
  precio: { ...typography.body, color: colors.mediumGray, marginTop: 4 },
  espacioArriba: { marginTop: 20 },
  filaTallas: { flexDirection: "row", gap: 10, marginTop: 10 },
  talla: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  tallaActiva: { backgroundColor: colors.black, borderColor: colors.black },
  tallaTexto: { color: colors.black, fontWeight: "600" },
  tallaTextoActivo: { color: colors.white },
});
