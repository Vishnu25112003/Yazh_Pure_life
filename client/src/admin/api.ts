export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public fields: Record<string, string> = {}
  ) {
    super(message);
  }
}

export const UNAUTHORIZED_EVENT = "admin:unauthorized";

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const isForm = body instanceof FormData;
  let res: Response;
  try {
    res = await fetch(`/api/admin${path}`, {
      method,
      credentials: "same-origin",
      headers: {
        "X-Requested-With": "XMLHttpRequest", // required by the server on writes (CSRF guard)
        ...(body !== undefined && !isForm ? { "Content-Type": "application/json" } : {}),
      },
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, "Can't reach the server. Check your connection and try again.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // A 401 on /login just means wrong credentials; anywhere else it means the session ended.
    if (res.status === 401 && path !== "/login") window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    throw new ApiError(res.status, data.error || "Something went wrong", data.fields);
  }
  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
  del: <T>(path: string) => request<T>("DELETE", path),
  async upload(files: File[], section: string): Promise<string[]> {
    const form = new FormData();
    files.forEach((f) => form.append("files", f));
    return (await request<{ urls: string[] }>("POST", `/upload?section=${encodeURIComponent(section)}`, form)).urls;
  },
};
