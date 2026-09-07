// src/components/LoadingIndicator.js
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../style/colors";

export default function LoadingIndicator() {
  return (
    <View style={styles.contenedor}>
      <ActivityIndicator size="large" color={colors.black} />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
