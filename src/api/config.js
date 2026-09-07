// src/api/config.js
// Backend real: LOW-WebClients (Node/Express + MongoDB), desplegado en Render.
export const API_URL = "https://low-webclients.onrender.com";

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
