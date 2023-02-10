import { useEffect, useState } from 'react'
import { User, Role } from '../types'
import Search from '../components/UI/Search'
import DropDown from '../components/UI/DropDown'
import useAxios from '../hooks/useAxios'
import { Icon } from '@iconify/react/dist/offline'
import Delete from '@iconify-icons/mdi/delete-outline'
import { getUserICon } from '../utils/helper'

const Team = () => {
  const [searchValue, setSearchValue] = useState('')
  const [members, setMembers] = useState<User[]>([])
  const [selected, setSelected] = useState<boolean[]>([false, false])
  const [roles, setRoles] = useState<Role[]>([])

  const getData = async () => {
    const { data: m } = await useAxios('/user/all')
    const { data: r } = await useAxios('/roles')
    setMembers(m)
    // setSelected(members.map(() => false))
    setRoles(r)
  }

  useEffect(() => {
    getData()
  }, [])

  const getFilteredMembers = () => {
    if (searchValue == '') return members

    return members.filter(({ name, email }) => {
      return (
        name.toLowerCase().includes(searchValue.toLowerCase()) ||
        email.toLowerCase().includes(searchValue.toLowerCase())
      )
    })
  }

  const getUsersSelection = (): boolean => selected.every((v) => v)

  return (
    <div>
      <h1 className="page-title">Team</h1>

      <div className="mb-2 flex items-center justify-between ">
        <Search
          placeholder="Search members"
          update={(val) => setSearchValue(val)}
        />
      </div>

      <div className="rounded-md, bg-gray-900 p-3">
        <table className="w-full">
          <thead className="text-xs text-gray-400">
            <tr>
              <td>
                <input
                  type="checkbox"
                  className="w-auto accent-pink-700"
                  name=""
                  id=""
                  checked={getUsersSelection()}
                  onChange={() => {
                    setSelected((prev) => {
                      if (prev.every((v) => v)) return prev.map(() => false)
                      return prev.map(() => true)
                    })
                  }}
                />
              </td>
              <td className="pb-2">Name</td>
              <td className="pb-2">Email</td>
              <td className="pb-2">Role</td>
              <td className="pb-2">Actions</td>
            </tr>
          </thead>
          <tbody>
            {getFilteredMembers().map(({ id, name, email, role }, i) => {
              return (
                <tr key={id}>
                  <td>
                    <input
                      type="checkbox"
                      className="w-auto accent-pink-700"
                      name=""
                      id=""
                      onChange={() => {
                        setSelected((prev) => {
                          return prev.map((p, x) => (x == i ? !p : p))
                        })
                      }}
                      checked={selected[i]}
                    />
                  </td>
                  <td className="flex items-center gap-2 py-1.5">
                    <span className="grid h-8 w-8 place-content-center rounded-full bg-red-700 text-xs uppercase">
                      {getUserICon(name)}
                    </span>
                    <h3>{name}</h3>
                  </td>
                  <td>{email}</td>
                  <td>
                    <DropDown
                      selected={role?.role}
                      options={roles}
                      keyValue="role"
                      fn={(value) =>
                        setMembers((curr) => {
                          return curr?.map((m: User) => {
                            if (m.id === id) return { ...m, role: value }
                            return m
                          })
                        })
                      }
                    />
                  </td>
                  <td>
                    <div className="-mx-1.5 flex items-center gap-2">
                      <button className="rounded-full p-1.5 text-red-600 transition-colors  hover:bg-gray-800">
                        <Icon icon={Delete} width="22px" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Team
