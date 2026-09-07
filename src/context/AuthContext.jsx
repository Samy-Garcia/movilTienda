// src/context/AuthContext.js
import React, { createContext, useCallback, useEffect, useState } from "react";
import {
  loginRequest,
  logoutRequest,
  meRequest,
  registerRequest,
  verifyRegisterCodeRequest,
} from "../api/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  // El backend usa una cookie httpOnly (authCookie), no un token que guardemos
  // nosotros. Al abrir la app, preguntamos al backend si esa cookie sigue
  // siendo válida llamando a /api/loginClient/me.
  const refrescarUsuario = useCallback(async () => {
    try {
      const datos = await meRequest();
      setUsuario(datos);
      return datos;
    } catch (error) {
      setUsuario(null);
      return null;
    }
  }, []);

  useEffect(() => {
    refrescarUsuario().finally(() => setCargandoSesion(false));
  }, [refrescarUsuario]);

  async function iniciarSesion(email, password) {
    await loginRequest(email, password);
    return refrescarUsuario();
  }

  // Paso 1: pide el registro (el backend manda el código por correo).
  async function registrarse(nombre, email, password) {
    return registerRequest({ nombre, email, password });
  }

  // Paso 2: confirma el código y recién ahí queda creada la cuenta.
  async function verificarRegistro(codigo) {
    return verifyRegisterCodeRequest(codigo);
  }

  async function cerrarSesion() {
    try {
      await logoutRequest();
    } finally {
      setUsuario(null);
    }
  }

  const valor = {
    usuario,
    cargandoSesion,
    estaAutenticado: !!usuario,
    iniciarSesion,
    registrarse,
    verificarRegistro,
    cerrarSesion,
    refrescarUsuario,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}
