import kyStandard, { type Options } from 'ky'

const { DEV, VITE_API_BASE_URL, VITE_API_PREFIX } = import.meta.env

export interface APIResponse {
  message: string

}

export interface APIResponseLength {
  total_length: number
  slice_shift: number
  slice_length: number
}

function createTypedKyInstance(options?: Options) {
  const instance = kyStandard.create(options)

  return {
    get: <T>(url: string, options?: Options) => instance.get(url, options).json<APIResponse & T>(),
    post: <T>(url: string, options?: Options) => instance.post(url, options).json<APIResponse & T>(),
    put: <T>(url: string, options?: Options) => instance.put(url, options).json<APIResponse & T>(),
    delete: <T>(url: string, options?: Options) => instance.delete(url, options).json<APIResponse & T>(),
    postBlob: (url: string, options?: Options) => instance.post(url, options).blob(),
  }
}

function getUrl() {
  if (DEV)
    return `${VITE_API_BASE_URL}/${VITE_API_PREFIX}`

  const { protocol, host } = globalThis.location
  return `${protocol}//${host}/${VITE_API_PREFIX}`
}

export const apiClient = kyStandard.create({
  prefixUrl: `${VITE_API_BASE_URL}/${VITE_API_PREFIX}`,
})

const ky = createTypedKyInstance({
  prefixUrl: getUrl(),
  timeout: 10000,
})

export default ky
