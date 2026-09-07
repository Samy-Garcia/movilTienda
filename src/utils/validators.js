// src/utils/validators.js

export function esCorreoValido(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo.trim());
}

export function esContrasenaValida(contrasena) {
  // Mínimo 6 caracteres
  return typeof contrasena === "string" && contrasena.length >= 6;
}

export function contrasenasCoinciden(contrasena, confirmacion) {
  return contrasena === confirmacion;
}

export function esCampoRequeridoValido(valor) {
  return typeof valor === "string" && valor.trim().length > 0;
}

export function esCodigoOtpValido(codigo) {
  return /^\d{4}$/.test(codigo);
}
