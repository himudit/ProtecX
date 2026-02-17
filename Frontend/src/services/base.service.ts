import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { store } from "../store";
import { logout } from "../store/slices/authSlice";
import { showDialog } from "../store/slices/uiSlice";


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
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        if (data?.message === "Session expired. Please login again.") {
          store.dispatch(
            showDialog({
              title: "Session Expired",
              message: data.message,
              onConfirm: () => {
                store.dispatch(logout());
                window.location.href = "/login";
              },
            })
          );
          return undefined as T;
        }

        if (data?.message === "Authentication required" || data?.message === "Invalid authentication token") {
          store.dispatch(logout());
          window.location.href = "/login";
          return undefined as T;
        }

      }
      throw data
    }

    // Network / unexpected error
    throw error;
  }
}
