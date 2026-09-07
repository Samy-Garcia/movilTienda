// src/api/cartService.js
// El carrito de la app hoy es local (CartContext), esto lo deja listo para
// cuando quieras persistirlo contra el backend en el checkout.
import { apiFetch } from "./client";
import { ENDPOINTS } from "./config";

// Trae el carrito pendiente de un cliente (o null si no tiene).
export async function getCarritoDelClienteRequest(clientId) {
  return apiFetch(`${ENDPOINTS.CART_BY_CLIENT}/${clientId}`, { method: "GET" });
}

// Reemplaza/crea el carrito pendiente del cliente con la lista de productos actual.
// products: [{ productId, quantity, size }]
export async function sincronizarCarritoRequest(clientId, products, status = "pending") {
  return apiFetch(ENDPOINTS.CART_SYNC, {
    method: "POST",
    body: JSON.stringify({ clientId, products, status }),
  });
}
