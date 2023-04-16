import { useState } from 'react'
import { type Role } from '../types'
import DropDown from './UI/DropDown'

type addFunc = ({
  name,
  email,
  role
}: {
  name: string
  email: string
  role: Omit<Role, 'createdAt'>
  roleId: number
}) => void

const AddMember = ({
  roles,
  add,
  cancel
}: {
  roles: Omit<Role, 'createdAt'>[]
  add: addFunc
  cancel: () => void
}) => {
  const [role, setRole] = useState<Omit<Role, 'createdAt'>>({
    role: 'user',
    id: 2,
    master: false
  })

  return (
    <form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault()

        const data = new FormData(e.target as HTMLFormElement)
        const values = [...data.values()]

        add({
          name: values[0] as string,
          email: values[1] as string,
          role: role,
          roleId: role.id
        })
      }}
    >
      <label htmlFor="name">Name</label>
      <input
        className="mb-3 px-3 text-sm"
        type="text"
        name="name"
        id="name"
        required
        autoFocus
      />
      <label htmlFor="email">Email</label>
      <input
        className="mb-3 px-3 text-sm"
        type="email"
        name="email"
        id="email"
        required
      />
      <label>Role</label>
      <DropDown
        className="!bg-brand-900 -m-px mb-3 !w-full !px-3.5 !py-2.5"
        selected={role.role}
        options={roles}
        keyValue="role"
        fn={(value) => {
          setRole(value)
        }}
      />

      <div className="mt-3 flex items-center justify-end gap-2">
        <button className="btn">Save</button>
        <button className="btn danger" type="reset" onClick={() => cancel()}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddMember
