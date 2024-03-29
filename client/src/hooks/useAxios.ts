import axios, { AxiosError, AxiosResponse, Method } from 'axios'
import { toast } from 'react-toastify'

type UseAxiosResponse = Promise<{ data: any; ok: boolean }>
interface UseAxiosOptions {
  method?: Method
  excludeBase?: boolean
  body?: any
  headers?: any
  params?: any
}

async function useAxios(path: string): UseAxiosResponse
async function useAxios(
  path: string,
  options: UseAxiosOptions
): UseAxiosResponse

async function useAxios(
  path: string,
  options?: UseAxiosOptions
): UseAxiosResponse {
  const method = options?.method || 'get',
    excludeBase = options?.excludeBase || false,
    body = options?.body || null,
    params = options?.params || null,
    headers = options?.headers || null

  let response: AxiosResponse
  const url = !excludeBase ? 'http://localhost:8080/api' + path : path

  try {
    response = await axios({
      method,
      url,
      data: body,
      params,
      validateStatus: function (status) {
        return status < 500
      },
      withCredentials: true,
      headers
    })

    const { data, statusText } = response

    return { data, ok: statusText === 'OK' }
  } catch (error) {
    if ((error as AxiosError).response?.status == 503)
      toast.error('Database is offline')
    else toast.error((error as AxiosError).message)
    return { data: null, ok: false }
  }
}

export default useAxios
