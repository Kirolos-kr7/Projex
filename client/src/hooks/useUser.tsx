import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { trpc } from '../utils/trpc'
import { handleError } from '../utils/helper'

const useUser = () => {
  const [pending, setPending] = useState(true)
  const [user, setUser] = useState<any>()

  useEffect(() => {
    const auth = async () => {
      try {
        const token = await trpc.auth.me.query()
        setPending(false)

        if (token) {
          const decoded = jwt_decode(token)
          setUser(decoded)
        }
      } catch (err) {
        handleError(err)
      }
    }
    auth()
  }, [])

  return { user, setUser, pending }
}

export default useUser
