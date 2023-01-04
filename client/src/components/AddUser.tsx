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

const AddMember = ({ add, cancel }: { add: addFunc; cancel: () => void }) => {
  const [role, setRole] = useState('user')
  const roles: UserRole[] = ['adminstrator', 'user', 'person', 'human']

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
      <label className="label" htmlFor="name">
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
      <label className="label" htmlFor="email">
        Email
      </label>
      <input
        className="mb-3 px-3 text-sm"
        type="email"
        name="email"
        id="email"
        required
      />
      <label className="label" htmlFor="password">
        Password
      </label>
      <input
        className="mb-3 px-3 text-sm"
        type="password"
        name="password"
        id="password"
        required
      />
      <label className="label" htmlFor="confirmPassword">
        Confirm Password
      </label>
      <input
        className="mb-3 px-3 text-sm"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        required
      />
      <label className="label">Role</label>
      <DropDown
        className="mb-3 !w-full !bg-gray-900"
        selected={role}
        options={roles}
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
