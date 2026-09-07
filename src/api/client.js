// src/api/client.js
// Wrapper de fetch para hablar con el backend de LOW-WebClients.
// El backend maneja la sesión con una cookie httpOnly (authCookie), no con
// Bearer token, así que usamos "credentials: include" para que React Native
// guarde y reenvíe esa cookie automáticamente en cada petición (igual que
// hace la app de macetas contra su propio backend).
import { API_URL } from "./config";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch(path, options = {}) {
  const isFormData = options.body instanceof FormData;

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...options.headers,
      },
    });
  } catch (error) {
    throw new ApiError("No se pudo conectar con el servidor. Verifica tu conexión.", 0);
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new ApiError(body?.message || "Ocurrió un error inesperado.", response.status);
  }

  return body;
}

export default apiFetch;
