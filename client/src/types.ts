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
