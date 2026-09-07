// src/api/authService.js
import { apiFetch } from "./client";
import { ENDPOINTS } from "./config";

// Inicia sesión con correo y contraseña.
// El backend responde { message, user: { _id, name, email, userType } }
// y deja la cookie de sesión (authCookie) puesta automáticamente.
export async function loginRequest(email, password) {
  return apiFetch(ENDPOINTS.LOGIN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// Devuelve el usuario de la sesión activa, o lanza ApiError (401) si no hay sesión.
export async function meRequest() {
  return apiFetch(ENDPOINTS.ME, { method: "GET" });
}

// Cierra sesión en el backend (borra la cookie authCookie).
export async function logoutRequest() {
  return apiFetch(ENDPOINTS.LOGOUT, { method: "POST" });
}

// Paso 1 del registro: el backend NO crea el cliente todavía, solo envía
// un código de verificación al correo y guarda los datos en una cookie temporal.
export async function registerRequest({ nombre, email, password }) {
  return apiFetch(ENDPOINTS.REGISTER, {
    method: "POST",
    body: JSON.stringify({ name: nombre, email, password }),
  });
}

// Paso 2 del registro: confirma el código enviado al correo y ahí sí se crea el cliente.
export async function verifyRegisterCodeRequest(codigo) {
  return apiFetch(ENDPOINTS.VERIFY_REGISTER_CODE, {
    method: "POST",
    body: JSON.stringify({ verificationCodeRequest: codigo }),
  });
}

// Recuperar contraseña - paso 1: solicita el código de verificación.
export async function sendRecoveryCodeRequest(email) {
  return apiFetch(ENDPOINTS.SEND_RECOVERY_CODE, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// Recuperar contraseña - paso 2: verifica el código OTP enviado al correo.
export async function verifyRecoveryCodeRequest(codigo) {
  return apiFetch(ENDPOINTS.VERIFY_RECOVERY_CODE, {
    method: "POST",
    body: JSON.stringify({ verificationCodeRequest: codigo }),
  });
}

// Recuperar contraseña - paso 3: define la nueva contraseña.
// El backend identifica el correo por la cookie temporal (recoverPasswordCookie),
// así que aquí solo se manda la nueva contraseña.
export async function resetPasswordRequest(nuevaContrasena) {
  return apiFetch(ENDPOINTS.RESET_PASSWORD, {
    method: "POST",
    body: JSON.stringify({ newPassword: nuevaContrasena }),
  });
}
