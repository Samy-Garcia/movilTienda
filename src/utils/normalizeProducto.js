// src/utils/normalizeProducto.js
// El backend de LOW-WebClients devuelve productos con este shape:
//   { _id, name, images: [{ image, public_id }], product_type, sub_type,
//     color, size, price, stock, description }
// La UI de la app (ProductCard, ProductDetailScreen, etc.) espera:
//   { id, nombre, precio, imagenUrl, color, categoria, subCategoria, talla, stock, descripcion }
export function normalizeProducto(item) {
  return {
    id: item._id,
    nombre: item.name,
    precio: item.price,
    imagenUrl: item.images?.[0]?.image || null,
    color: item.color || null,
    categoria: item.product_type || null,
    subCategoria: item.sub_type || null,
    talla: item.size || null,
    stock: item.stock,
    descripcion: item.description || "",
  };
}
