export async function apiClient<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token');
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
}
