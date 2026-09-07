// src/screens/Auth/VerifyCodeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OtpInput from "../../components/OtpInput";
import PrimaryButton from "../../components/PrimaryButton";
import {
  verifyRecoveryCodeRequest,
  sendRecoveryCodeRequest,
  verifyRegisterCodeRequest,
  registerRequest,
} from "../../api/authService";
import { esCodigoOtpValido } from "../../utils/validators";
import { globalStyles } from "../../style/globalStyles";
import { typography } from "../../style/typography";
import { colors } from "../../style/colors";

const SEGUNDOS_REENVIO = 10;

// modo: "recuperar" (default) o "registro". Cada uno pega a un endpoint distinto
// del backend, pero comparten la misma pantalla de código OTP.
export default function VerifyCodeScreen({ navigation, route }) {
  const { email, modo = "recuperar", datosRegistro } = route.params;
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [segundosRestantes, setSegundosRestantes] = useState(SEGUNDOS_REENVIO);

  useEffect(() => {
    if (segundosRestantes <= 0) return;
    const temporizador = setTimeout(() => setSegundosRestantes((s) => s - 1), 1000);
    return () => clearTimeout(temporizador);
  }, [segundosRestantes]);

  async function manejarVerificacion() {
    if (!esCodigoOtpValido(codigo)) {
      setError("Ingresa el código de verificación");
      return;
    }
    setError(null);
    setCargando(true);
    try {
      if (modo === "registro") {
        await verifyRegisterCodeRequest(codigo);
        Alert.alert("Cuenta creada", "Ahora puedes iniciar sesión.", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        await verifyRecoveryCodeRequest(codigo);
        navigation.navigate("NewPassword", { email });
      }
    } catch (e) {
      Alert.alert("Código incorrecto", "Verifica el código e intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  async function manejarReenvio() {
    try {
      if (modo === "registro" && datosRegistro) {
        await registerRequest(datosRegistro);
      } else {
        await sendRecoveryCodeRequest(email);
      }
      setSegundosRestantes(SEGUNDOS_REENVIO);
    } catch (e) {
      Alert.alert("No se pudo reenviar el código");
    }
  }

  return (
    <View style={globalStyles.screenContainer}>
      <TouchableOpacity style={styles.botonAtras} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={26} color={colors.black} />
      </TouchableOpacity>

      <Text style={typography.titleLarge}>Código de verificación</Text>
      <Text style={styles.subtitulo}>
        Introduzca el código de verificación que le enviamos a su correo electrónico.
      </Text>

      <OtpInput codigo={codigo} onChangeCodigo={setCodigo} />
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

      {segundosRestantes > 0 ? (
        <Text style={styles.reenviarTexto}>
          Reenviar en 00:{segundosRestantes.toString().padStart(2, "0")}
        </Text>
      ) : (
        <TouchableOpacity onPress={manejarReenvio}>
          <Text style={styles.reenviarLink}>Reenviar código</Text>
        </TouchableOpacity>
      )}

      <View style={styles.espacio} />
      <PrimaryButton titulo="VERIFICAR" onPress={manejarVerificacion} cargando={cargando} />
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
  reenviarTexto: { color: colors.mediumGray, fontSize: 13 },
  reenviarLink: { color: colors.black, fontWeight: "700", fontSize: 13 },
  espacio: { height: 24 },
});
