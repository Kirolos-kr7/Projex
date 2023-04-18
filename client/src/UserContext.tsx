import { Dispatch, SetStateAction, createContext } from 'react'
import { User, UserWithRole } from './types'

export const UserContext = createContext<{
  user: UserWithRole | null
  setUser: Dispatch<SetStateAction<User | null>>
}>({ user: null, setUser: () => null })
