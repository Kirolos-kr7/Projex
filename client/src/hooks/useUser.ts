import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { trpc } from '../utils/trpc'
import { handleError } from '../utils/helper'
import { UserWithRole } from '../types'
import userStore from '../stores/userStore'

const useUser = () => {
  const [pending, setPending] = useState(true)
  const { user, setUser } = userStore()

  useEffect(() => {
    const auth = async () => {
      try {
        const token = await trpc.auth.me.query()
        setPending(false)

        if (token) {
          const decoded = jwt_decode(token) as UserWithRole
          setUser(decoded)
        }
      } catch (err) {
        handleError(err)
      }
    }
    auth()
  }, [])

  return { user, pending }
}

export default useUser
