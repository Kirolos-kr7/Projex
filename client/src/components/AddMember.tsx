import { useState } from 'react'
import { UserRole } from '../types'
import DropDown from './UI/DropDown'

type addFunc = ({
  name,
  email,
  role,
  id
}: {
  name: any
  email: any
  role: any
  id: number
}) => void

const AddMember = ({
  roles,
  add,
  cancel
}: {
  roles: UserRole[]
  add: addFunc
  cancel: () => void
}) => {
  const [role, setRole] = useState('user')

  return (
    <form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault()

        const data = new FormData(e.target as HTMLFormElement)
        const values = [...data.values()]

        add({ name: values[0], email: values[1], role: role, id: Date.now() })
      }}
    >
      <label className="mb-1 block text-sm text-gray-400" htmlFor="name">
        Name
      </label>
      <input
        className="mb-3 px-3 text-sm"
        type="text"
        name="name"
        id="name"
        required
        autoFocus
      />
      <label className="mb-1 block text-sm text-gray-400" htmlFor="email">
        Email
      </label>
      <input
        className="mb-3 px-3 text-sm"
        type="email"
        name="email"
        id="email"
        required
      />
      <label className="mb-1 block text-sm text-gray-400">Role</label>
      <DropDown
        className="mb-3 !w-full !bg-gray-900"
        selected={role}
        options={roles}
        fn={(value) => {
          setRole(value)
        }}
      />

      <div className="mt-3 flex items-center justify-end gap-2">
        <button className="base">Save</button>
        <button className="base danger" type="reset" onClick={() => cancel()}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddMember
