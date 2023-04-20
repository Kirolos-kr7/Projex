import { create } from 'zustand'
import { UserWithRole } from '../types'

type CanBeUser = UserWithRole | null

type Props = {
  user: CanBeUser
  setUser: (user: CanBeUser) => void
}

const userStore = create<Props>((set) => ({
  user: null,
  setUser: (user: CanBeUser) => set({ user })
}))

export default userStore
