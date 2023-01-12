import { useEffect, useState } from 'react'
import useAxios from './useAxios'
import jwt_decode from 'jwt-decode'
import { redirect } from 'react-router'

const useUser = () => {
  const [pending, setPending] = useState(true)
  const [user, setUser] = useState<any>()

  useEffect(() => {
    const auth = async () => {
      const { ok, data } = await useAxios({ path: '/auth/me' })
      setPending(false)

      if (data?.token) {
        const decoded = jwt_decode(data.token)
        setUser(decoded)
      }

      if (ok) redirect('/')
      else redirect('/auth')
    }
    auth()
  }, [])

  return { user, setUser, pending }
}

export default useUser
