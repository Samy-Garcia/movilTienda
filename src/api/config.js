// src/api/config.js
// Backend real: LOW-WebClients (Node/Express + MongoDB), corre en localhost:4000 en desarrollo.
//   - Emulador Android: usa 10.0.2.2 en vez de localhost
//   - Dispositivo físico: usa la IP local de tu PC, ej. http://192.168.1.10:4000
//   - Cuando esté desplegado en Render, cambia esto por esa URL (https://...onrender.com)
export const API_URL = "http://10.0.2.2:4000";

export const ENDPOINTS = {
  LOGIN: "/api/loginClient",
  LOGOUT: "/api/loginClient/logout",
  ME: "/api/loginClient/me",
  REGISTER: "/api/registerClient",
  VERIFY_REGISTER_CODE: "/api/registerClient/verifyCodeEmail",
  SEND_RECOVERY_CODE: "/api/recoverClientPassword/sendRecoveryCode",
  VERIFY_RECOVERY_CODE: "/api/recoverClientPassword/verifyCode",
  RESET_PASSWORD: "/api/recoverClientPassword/resetPassword",
  PRODUCTS: "/api/products",
  CART_BY_CLIENT: "/api/carts/client",
  CART_SYNC: "/api/carts/sync",
};
