// src/screens/Auth/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import SocialLoginRow from "../../components/SocialLoginRow";
import { useAuth } from "../../hooks/useAuth";
import { ApiError } from "../../api/client";
import { esCorreoValido, esCampoRequeridoValido } from "../../utils/validators";
import { globalStyles } from "../../style/globalStyles";
import { typography } from "../../style/typography";

export default function LoginScreen({ navigation }) {
  const { iniciarSesion } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  function validarFormulario() {
    const nuevosErrores = {};
    if (!esCampoRequeridoValido(email)) {
      nuevosErrores.email = "El correo es obligatorio";
    } else if (!esCorreoValido(email)) {
      nuevosErrores.email = "Ingresa un correo válido";
    }
    if (!esCampoRequeridoValido(password)) {
      nuevosErrores.password = "La contraseña es obligatoria";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  async function manejarLogin() {
    if (!validarFormulario()) return;
    setCargando(true);
    try {
      await iniciarSesion(email.trim(), password);
      // La navegación a Main la controla RootNavigator al detectar el token
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        Alert.alert("Credenciales incorrectas", "Correo o contraseña incorrectos.");
      } else if (error instanceof ApiError && error.status === 403) {
        Alert.alert(
          "Cuenta bloqueada",
          "Demasiados intentos fallidos. Intenta de nuevo en unos minutos."
        );
      } else {
        Alert.alert(
          "No se pudo iniciar sesión",
          "Verifica tu conexión e intenta de nuevo."
        );
      }
    } finally {
      setCargando(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={globalStyles.screenContainer}>
      <View style={styles.espacioSuperior} />
      <Text style={typography.titleLarge}>Inicia sesión en tu cuenta</Text>

      <View style={styles.espacio} />

      <InputField
        etiqueta="Dirección de correo electrónico"
        valor={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        error={errores.email}
      />
      <InputField
        etiqueta="Contraseña"
        valor={password}
        onChangeText={setPassword}
        esContrasena
        error={errores.password}
      />

      <TouchableOpacity
        style={styles.olvideContainer}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={styles.olvideTexto}>¿Has olvidado tu contraseña?</Text>
      </TouchableOpacity>

      <PrimaryButton titulo="LOG IN" onPress={manejarLogin} cargando={cargando} />

      <Text style={styles.textoCentrado}>o inicia sesión con</Text>
      <SocialLoginRow />

      <TouchableOpacity
        style={styles.registroContainer}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.textoCentrado}>
          ¿No tienes cuenta? <Text style={globalStyles.linkText}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  espacioSuperior: { height: 40 },
  espacio: { height: 24 },
  olvideContainer: { alignItems: "flex-end", marginBottom: 24 },
  olvideTexto: { fontSize: 13, color: "#767676" },
  textoCentrado: { textAlign: "center", marginTop: 16, fontSize: 13 },
  registroContainer: { marginTop: 8, marginBottom: 40 },
});
