import axios from "axios";
import type { AxiosRequestConfig } from "axios";


export async function apiClient<T>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<T> {
  const token = localStorage.getItem("token");
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  try {
    const response = await axios<T>({
      ...options,
      url: `${API_BASE_URL}${url}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...(options.headers || {}),
      },
    });

    console.log("baseService", response.data);
    return response.data;
  } catch (error: any) {
    // Axios puts response errors here
    if (error.response) {
      throw error.response.data;
    }

    // Network / unexpected error
    throw error;
  }
}
