import { ref } from "vue";

const API_BASE_URL = 
import.meta.env.VITE_API_URL || "https://appsu4-production.up.railway.app/api";

export function useApi() {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  let controller = null;

  function cancelRequest() {
    if (controller) {
      controller.abort();
      controller = null;
    }
  }

  async function request(path, options = {}, { retry = false } = {}) {
    cancelRequest();
    controller = new AbortController();

    loading.value = true;
    error.value = null;

    const maxAttempts = retry ? 2 : 1;
    let lastError = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await fetch(`${API_BASE_URL}${path}`, {
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
          },
          signal: controller.signal,
          ...options,
        });

        if (!response.ok) {
          let body = {};
          try {
            body = await response.json();
          } catch {
            // ignore
          }
          throw new Error(body.message || `Error HTTP ${response.status}`);
        }

        const json = await response.json();
        data.value = json;
        loading.value = false;
        return json;
      } catch (err) {
        if (err.name === "AbortError") {
          loading.value = false;
          error.value = "Petición cancelada";
          throw err;
        }

        lastError = err;

        if (attempt === maxAttempts) {
          error.value = err.message || "Error de red";
          loading.value = false;
          throw err;
        }
      }
    }

    loading.value = false;
    if (lastError) throw lastError;
  }

  return {
    data,
    loading,
    error,
    request,
    cancelRequest,
  };
}


