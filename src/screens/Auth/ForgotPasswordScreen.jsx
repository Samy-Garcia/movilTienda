// src/screens/Auth/ForgotPasswordScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import { sendRecoveryCodeRequest } from "../../api/authService";
import { esCorreoValido, esCampoRequeridoValido } from "../../utils/validators";
import { globalStyles } from "../../style/globalStyles";
import { typography } from "../../style/typography";
import { colors } from "../../style/colors";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  async function manejarEnvio() {
    if (!esCampoRequeridoValido(email)) {
      setError("El correo es obligatorio");
      return;
    }
    if (!esCorreoValido(email)) {
      setError("Ingresa un correo válido");
      return;
    }
    setError(null);
    setCargando(true);
    try {
      await sendRecoveryCodeRequest(email.trim());
      navigation.navigate("VerifyCode", { email: email.trim(), modo: "recuperar" });
    } catch (e) {
      Alert.alert("No se pudo enviar el código", "Verifica el correo e intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <View style={globalStyles.screenContainer}>
      <TouchableOpacity style={styles.botonAtras} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={26} color={colors.black} />
      </TouchableOpacity>

      <Text style={typography.titleLarge}>Recuperar contraseña</Text>
      <Text style={styles.subtitulo}>
        Introduce tu correo y te enviaremos un código de verificación.
      </Text>

      <View style={styles.espacio} />

      <InputField
        etiqueta="Dirección de correo electrónico"
        valor={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        error={error}
      />

      <PrimaryButton titulo="ENVIAR CÓDIGO" onPress={manejarEnvio} cargando={cargando} />
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
