import { useEffect, useState } from 'react'
import { Role } from '../types'
import DropDown from './UI/DropDown'
import useAxios from '../hooks/useAxios'

type addFunc = ({
  name,
  email,
  roleId,
  password,
  confirmPassword
}: {
  name: string
  email: string
  roleId: number
  password: string
  confirmPassword: string
}) => void

const AddMember = ({ add, cancel }: { add: addFunc; cancel: () => void }) => {
  const [role, setRole] = useState<Role>({ role: 'user', id: 2, master: false })
  const [roles, setRoles] = useState<Role[]>([])

  const getData = async () => {
    const { data: r } = await useAxios('/roles')
    setRoles(r)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault()

        const data = new FormData(e.target as HTMLFormElement)
        const [name, email, password, confirmPassword] = [
          ...data.values()
        ] as string[]

        add({
          name,
          email,
          password,
          confirmPassword,
          roleId: role.id
        })
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
