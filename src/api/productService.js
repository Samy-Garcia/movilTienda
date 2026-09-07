// src/api/productService.js
import { apiFetch } from "./client";
import { ENDPOINTS } from "./config";
import { normalizeProducto } from "../utils/normalizeProducto";

// Obtiene todos los productos. El backend real (GET /api/products) no filtra
// por categoría ni por texto: eso lo resolvemos en el cliente con las
// funciones de abajo, filtrando sobre este mismo listado.
export async function getProductosRequest() {
  const productos = await apiFetch(ENDPOINTS.PRODUCTS, { method: "GET" });
  return productos.map(normalizeProducto);
}

// Obtiene un producto por id (GET /api/products/:id).
export async function getProductoPorIdRequest(id) {
  const producto = await apiFetch(`${ENDPOINTS.PRODUCTS}/${id}`, { method: "GET" });
  return normalizeProducto(producto);
}

// Filtra por categoría (product_type: "Mujer", "Hombre", "Accesorios", etc.)
// del lado del cliente, ya que el backend no tiene un endpoint dedicado.
export async function getProductosPorCategoriaRequest(categoria) {
  const productos = await getProductosRequest();
  return productos.filter(
    (p) => p.categoria?.toLowerCase() === categoria.toLowerCase()
  );
}

// Busca por nombre/descripción del lado del cliente, mismo motivo que arriba.
export async function buscarProductosRequest(query) {
  const productos = await getProductosRequest();
  const texto = query.trim().toLowerCase();
  return productos.filter(
    (p) =>
      p.nombre?.toLowerCase().includes(texto) ||
      p.descripcion?.toLowerCase().includes(texto)
  );
}
