import { type User } from '../../node_modules/@prisma/client'

export interface Repo {
  origin: string
  name: string
  updatedAt: Date
}

export interface DropDown {
  selected: any
  options: any[]
  fn?: (value?: any) => void
  keyValue?: any
  keyName?: any
  className?: string
  disabled?: boolean
}

export type SelectUserBoard = Pick<
  User,
  'id' | 'userName' | 'hasProfileImage'
> & { selected: boolean }
