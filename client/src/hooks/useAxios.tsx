import axios, { AxiosResponse } from 'axios'

interface AxiosRequest {
  method?: string
  withoutBase?: boolean
  path: string
  body?: any
}

const useAxios = async ({
  method = 'get',
  withoutBase = false,
  path,
  body
}: AxiosRequest) => {
  let response: AxiosResponse
  const url = !withoutBase ? 'http://localhost:8080/api' + path : path

  try {
    response = await axios({
      method,
      url,
      data: body,
      validateStatus: function (status) {
        return status < 500
      },
      withCredentials: true
    })

    const { data, statusText } = response

    return { data, ok: statusText === 'OK' }
  } catch (error) {
    return { err: error, pending: false }
  }
}

export default useAxios
