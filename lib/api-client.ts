import { headers } from 'next/dist/server/request/headers';

type APIResponse<T> =
  | { ok: true; data: T }
  | { ok: false; msg: string; errors?: Record<string, any>; status: number };

export async function apiFetch<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  try {
    const res = await fetch(url, { headers: await headers(), ...options });
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 422) {
        return {
          ok: false,
          msg: 'Validation error',
          errors: data.msg,
          status: res.status,
        };
      }

      return {
        ok: false,
        msg: data.msg || 'Error fetching data',
        status: res.status,
      };
    }

    return { ok: true, data };
  } catch (err) {
    console.log('a', err);
    return {
      ok: false,
      msg: 'Error connecting to server',
      status: 503,
    };
  }
}
