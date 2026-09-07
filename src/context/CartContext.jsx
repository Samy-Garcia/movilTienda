// src/context/CartContext.js
import React, { createContext, useMemo, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function agregarAlCarrito(producto, talla, color) {
    setItems((actual) => {
      const existente = actual.find(
        (item) =>
          item.id === producto.id && item.talla === talla && item.color === color
      );
      if (existente) {
        return actual.map((item) =>
          item === existente ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [
        ...actual,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagenUrl: producto.imagenUrl,
          talla,
          color,
          cantidad: 1,
        },
      ];
    });
  }

  function incrementarCantidad(indice) {
    setItems((actual) =>
      actual.map((item, i) =>
        i === indice ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  }

  function decrementarCantidad(indice) {
    setItems((actual) =>
      actual
        .map((item, i) =>
          i === indice ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  function eliminarDelCarrito(indice) {
    setItems((actual) => actual.filter((_, i) => i !== indice));
  }

  function vaciarCarrito() {
    setItems([]);
  }

  const total = useMemo(
    () => items.reduce((suma, item) => suma + item.precio * item.cantidad, 0),
    [items]
  );

  const valor = {
    items,
    total,
    agregarAlCarrito,
    incrementarCantidad,
    decrementarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
  };

  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>;
}
