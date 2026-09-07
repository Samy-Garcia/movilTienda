// src/screens/Main/SearchScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductCard from "../../components/ProductCard";
import LoadingIndicator from "../../components/LoadingIndicator";
import { buscarProductosRequest } from "../../api/productService";
import { globalStyles } from "../../style/globalStyles";
import { typography } from "../../style/typography";
import { colors } from "../../style/colors";

export default function SearchScreen({ navigation }) {
  const [consulta, setConsulta] = useState("");
  const [busquedasRecientes, setBusquedasRecientes] = useState(["Gafas de sol", "Suéter", "Sudadera"]);
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [seBusco, setSeBusco] = useState(false);

  async function manejarBusqueda(texto) {
    setConsulta(texto);
  }

  async function ejecutarBusqueda() {
    if (!consulta.trim()) return;
    setCargando(true);
    setSeBusco(true);
    try {
      const datos = await buscarProductosRequest(consulta.trim());
      setResultados(datos);
      if (!busquedasRecientes.includes(consulta.trim())) {
        setBusquedasRecientes((actual) => [consulta.trim(), ...actual].slice(0, 5));
      }
    } catch (e) {
      setResultados([]);
    } finally {
      setCargando(false);
    }
  }

  function eliminarBusquedaReciente(termino) {
    setBusquedasRecientes((actual) => actual.filter((t) => t !== termino));
  }

  return (
    <View style={globalStyles.screenContainer}>
      <View style={styles.espacioSuperior} />
      <View style={styles.inputBusqueda}>
        <Ionicons name="search-outline" size={18} color={colors.mediumGray} />
        <TextInput
          style={styles.textoInput}
          placeholder="Buscar"
          placeholderTextColor={colors.mediumGray}
          value={consulta}
          onChangeText={manejarBusqueda}
          onSubmitEditing={ejecutarBusqueda}
          returnKeyType="search"
        />
      </View>

      {!seBusco && (
        <>
          <View style={styles.filaTitulo}>
            <Text style={typography.bodyBold}>Búsquedas recientes</Text>
            <Ionicons name="trash-outline" size={18} color={colors.mediumGray} />
          </View>
          <View style={styles.chipsContenedor}>
            {busquedasRecientes.map((termino) => (
              <View key={termino} style={styles.chip}>
                <Text style={styles.chipTexto}>{termino}</Text>
                <TouchableOpacity onPress={() => eliminarBusquedaReciente(termino)}>
                  <Ionicons name="close" size={14} color={colors.mediumGray} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </>
      )}

      {cargando && <LoadingIndicator />}

      {seBusco && !cargando && (
        <FlatList
          data={resultados}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.columnas}
          renderItem={({ item }) => (
            <ProductCard
              producto={item}
              onPress={() => navigation.navigate("ProductDetail", { producto: item })}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.vacioTexto}>No se encontraron productos.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  espacioSuperior: { height: 16 },
  inputBusqueda: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    marginBottom: 20,
  },
  textoInput: { flex: 1, fontSize: 14, color: colors.black },
  filaTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  chipsContenedor: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  chipTexto: { fontSize: 13, color: colors.black },
  columnas: { justifyContent: "space-between" },
  vacioTexto: { textAlign: "center", color: colors.mediumGray, marginTop: 20 },
});
