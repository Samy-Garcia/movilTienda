// src/screens/Main/HomeScreen.js
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductCard from "../../components/ProductCard";
import CategoryTabs from "../../components/CategoryTabs";
import LoadingIndicator from "../../components/LoadingIndicator";
import { getProductosPorCategoriaRequest, getProductosRequest } from "../../api/productService";
import { globalStyles } from "../../style/globalStyles";
import { typography } from "../../style/typography";
import { colors } from "../../style/colors";

export default function HomeScreen({ navigation }) {
  const [categoriaActiva, setCategoriaActiva] = useState("Mujer");
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarProductos = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await getProductosPorCategoriaRequest(categoriaActiva);
      setProductos(datos);
    } catch (e) {
      // Si tu API aún no soporta filtro por categoría, caemos al listado general
      try {
        const datos = await getProductosRequest();
        setProductos(datos);
      } catch (errorGeneral) {
        setError("No se pudieron cargar los productos");
      }
    } finally {
      setCargando(false);
    }
  }, [categoriaActiva]);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  return (
    <View style={globalStyles.screenContainerNoPadding}>
      <View style={styles.encabezado}>
        <Ionicons name="menu-outline" size={26} color={colors.black} />
        <Text style={styles.logo}>LØØM &amp; WEFT</Text>
        <Ionicons name="add" size={26} color={colors.black} />
      </View>

      <CategoryTabs categoriaActiva={categoriaActiva} onSeleccionar={setCategoriaActiva} />

      <View style={styles.filaTitulo}>
        <Text style={typography.bodyBold}>Productos destacados</Text>
        <Text style={styles.mostrarTodos}>Mostrar todos</Text>
      </View>

      {cargando && <LoadingIndicator />}
      {error && <Text style={styles.errorTexto}>{error}</Text>}

      {!cargando && !error && (
        <FlatList
          data={productos}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.columnas}
          contentContainerStyle={styles.listaContenido}
          renderItem={({ item }) => (
            <ProductCard
              producto={item}
              onPress={() => navigation.navigate("ProductDetail", { producto: item })}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.vacioTexto}>No hay productos en esta categoría todavía.</Text>
          }
        />
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
  },
  logo: {
    ...typography.titleMedium,
    letterSpacing: 1,
  },
  filaTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  mostrarTodos: {
    color: colors.mediumGray,
    fontSize: 13,
  },
  columnas: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  listaContenido: {
    paddingBottom: 20,
  },
  errorTexto: {
    textAlign: "center",
    color: colors.error,
    marginTop: 20,
  },
  vacioTexto: {
    textAlign: "center",
    color: colors.mediumGray,
    marginTop: 20,
  },
});
