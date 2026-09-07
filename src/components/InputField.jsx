// src/components/InputField.js
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../style/colors";
import { typography } from "../style/typography";

export default function InputField({
  etiqueta,
  valor,
  onChangeText,
  esContrasena = false,
  error,
  keyboardType = "default",
  autoCapitalize = "none",
  placeholder = "",
}) {
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <View
        style={[
          styles.inputWrapper,
          error ? { borderBottomColor: colors.error } : null,
        ]}
      >
        <TextInput
          style={styles.input}
          value={valor}
          onChangeText={onChangeText}
          secureTextEntry={esContrasena && !mostrarContrasena}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder}
          placeholderTextColor={colors.mediumGray}
        />
        {esContrasena && (
          <TouchableOpacity onPress={() => setMostrarContrasena((v) => !v)}>
            <Ionicons
              name={mostrarContrasena ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={colors.mediumGray}
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 20,
  },
  etiqueta: {
    ...typography.bodyBold,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.black,
    paddingVertical: 2,
  },
  error: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});
