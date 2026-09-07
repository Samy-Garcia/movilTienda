// src/screens/Auth/NewPasswordScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import { resetPasswordRequest } from "../../api/authService";
import { esContrasenaValida, contrasenasCoinciden } from "../../utils/validators";
import { globalStyles } from "../../style/globalStyles";
import { typography } from "../../style/typography";
import { colors } from "../../style/colors";

export default function NewPasswordScreen({ navigation, route }) {
  const { email } = route.params;
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  function validarFormulario() {
    const nuevosErrores = {};
    if (!esContrasenaValida(password)) {
      nuevosErrores.password = "Mínimo 6 caracteres";
    }
    if (!contrasenasCoinciden(password, confirmarPassword)) {
      nuevosErrores.confirmarPassword = "Las contraseñas no coinciden";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  async function manejarConfirmacion() {
    if (!validarFormulario()) return;
    setCargando(true);
    try {
      // El backend identifica el correo por la cookie temporal de recuperación,
      // así que aquí solo enviamos la nueva contraseña.
      await resetPasswordRequest(password);
      navigation.navigate("PasswordSuccess");
    } catch (e) {
      Alert.alert("No se pudo cambiar la contraseña", "Intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <View style={globalStyles.screenContainer}>
      <TouchableOpacity style={styles.botonAtras} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={26} color={colors.black} />
      </TouchableOpacity>

      <Text style={typography.titleLarge}>Crear nueva contraseña</Text>
      <Text style={styles.subtitulo}>
        Su nueva contraseña debe ser diferente de la contraseña utilizada anteriormente.
      </Text>

      <View style={styles.espacio} />

      <InputField
        etiqueta="Contraseña"
        valor={password}
        onChangeText={setPassword}
        esContrasena
        error={errores.password}
      />
      <InputField
        etiqueta="confirmar Contraseña"
        valor={confirmarPassword}
        onChangeText={setConfirmarPassword}
        esContrasena
        error={errores.confirmarPassword}
      />

      <PrimaryButton titulo="Confirmar" onPress={manejarConfirmacion} cargando={cargando} />
    </View>
  );
}

const styles = StyleSheet.create({
  botonAtras: { marginTop: 8, marginBottom: 16 },
  subtitulo: {
    ...typography.body,
    color: colors.mediumGray,
    marginTop: 8,
  },
  espacio: { height: 24 },
});
