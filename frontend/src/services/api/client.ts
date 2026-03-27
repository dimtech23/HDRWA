export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const configuredBase = (import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/+$/, '')
  const defaultBase = `${import.meta.env.BASE_URL}api`.replace(/\/+$/, '')
  const apiBase = configuredBase || defaultBase

  const normalizedPath = path.replace(/^\/+/, '')
  const pathWithoutApiPrefix = normalizedPath.startsWith('api/')
    ? normalizedPath.slice(4)
    : normalizedPath
  const requestUrl = /^https?:\/\//.test(path)
    ? path
    : `${apiBase}/${pathWithoutApiPrefix}`.replace(/([^:]\/)\/+/g, '$1')

  const response = await fetch(requestUrl, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}
