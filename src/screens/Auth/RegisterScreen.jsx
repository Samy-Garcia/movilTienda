// src/screens/Auth/RegisterScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import SocialLoginRow from "../../components/SocialLoginRow";
import { useAuth } from "../../hooks/useAuth";
import { ApiError } from "../../api/client";
import {
  esCorreoValido,
  esContrasenaValida,
  contrasenasCoinciden,
  esCampoRequeridoValido,
} from "../../utils/validators";
import { globalStyles } from "../../style/globalStyles";
import { typography } from "../../style/typography";

export default function RegisterScreen({ navigation }) {
  const { registrarse } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  function validarFormulario() {
    const nuevosErrores = {};
    if (!esCampoRequeridoValido(nombre)) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }
    if (!esCampoRequeridoValido(email)) {
      nuevosErrores.email = "El correo es obligatorio";
    } else if (!esCorreoValido(email)) {
      nuevosErrores.email = "Ingresa un correo válido";
    }
    if (!esContrasenaValida(password)) {
      nuevosErrores.password = "Mínimo 6 caracteres";
    }
    if (!contrasenasCoinciden(password, confirmarPassword)) {
      nuevosErrores.confirmarPassword = "Las contraseñas no coinciden";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  async function manejarRegistro() {
    if (!validarFormulario()) return;
    setCargando(true);
    try {
      // El backend no crea la cuenta todavía: manda un código de verificación
      // al correo y la cuenta se crea recién cuando se confirma ese código.
      console.log(email, "Email en:")
      await registrarse(nombre.trim(), email.trim(), password);
      navigation.navigate("VerifyCode", {
        email: email.trim(),
        modo: "registro",
        datosRegistro: { nombre: nombre.trim(), email: email.trim(), password },
      });
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        Alert.alert("No se pudo crear la cuenta", "Ese correo ya está registrado.");
      } else if (error instanceof ApiError && error.status === 0) {
        Alert.alert("Sin conexión", "No se pudo conectar con el servidor. Revisa tu internet.");
      } else if (error instanceof ApiError) {
        Alert.alert("No se pudo crear la cuenta", error.message);
      } else {
        Alert.alert("No se pudo crear la cuenta", "Intenta de nuevo más tarde.");
      }
    } finally {
      setCargando(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={globalStyles.screenContainer}>
      <View style={styles.espacioSuperior} />
      <Text style={typography.titleLarge}>Crea tu cuenta</Text>
      <View style={styles.espacio} />

      <InputField
        etiqueta="Introduce tu nombre"
        valor={nombre}
        onChangeText={setNombre}
        error={errores.nombre}
      />
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
      <InputField
        etiqueta="Confirmar Contraseña"
        valor={confirmarPassword}
        onChangeText={setConfirmarPassword}
        esContrasena
        error={errores.confirmarPassword}
      />

      <PrimaryButton titulo="INSCRIBIRSE" onPress={manejarRegistro} cargando={cargando} />

      <Text style={styles.textoCentrado}>o regístrate con</Text>
      <SocialLoginRow />

      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.textoCentrado}>
          ¿Ya tienes una cuenta? <Text style={globalStyles.linkText}>Iniciar sesión</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  espacioSuperior: { height: 40 },
  espacio: { height: 24 },
  textoCentrado: { textAlign: "center", marginTop: 16, fontSize: 13 },
  loginContainer: { marginTop: 8, marginBottom: 40 },
});
