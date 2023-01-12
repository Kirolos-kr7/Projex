import { Role } from '../types'
import Search from '../components/UI/Search'
import Popup from '../components/UI/Popup'
import AddRole from '../components/AddRole'
import { useEffect, useState } from 'react'
import useAxios from '../hooks/useAxios'

import { Icon } from '@iconify/react/dist/offline'
import Privileges from '@iconify-icons/ic/list'
import Delete from '@iconify-icons/ic/delete'

const Roles = () => {
  const [searchValue, setSearchValue] = useState('')
  const [popupOpened, setPopupOpened] = useState(false)
  const [roles, setRoles] = useState<Role[]>([])

  const getRoles = async () => {
    const { data } = await useAxios({ path: '/roles' })
    setRoles(data)
  }

  useEffect(() => {
    getRoles()
  }, [])

  const getFilteredRoles = () => {
    if (searchValue == '') return roles

    return roles.filter(({ role, privileges }) => {
      return (
        role.toLowerCase().includes(searchValue.toLowerCase()) ||
        privileges?.join(' ').toLowerCase().includes(searchValue.toLowerCase())
      )
    })
  }

  return (
    <div>
      <h1 className="page-title">Roles</h1>

      <div className="mb-2 flex items-center justify-between ">
        <Search
          placeholder="Search roles"
          update={(val) => setSearchValue(val)}
        />
        <button className="btn base" onClick={() => setPopupOpened(true)}>
          Add Role
        </button>
      </div>

      <div className="rounded-md bg-gray-900 p-3">
        <table className="w-full">
          <thead className="text-xs text-gray-400">
            <tr>
              <td className="pb-2">Role</td>
              <td className="pb-2">Privileges</td>
              <td className="pb-2">Actions</td>
            </tr>
          </thead>
          <tbody>
            {getFilteredRoles().map(({ role, id, privileges, master }) => {
              return (
                <tr key={id}>
                  <td className="flex items-center gap-2 py-1.5">{role}</td>
                  <td className="text-xs">{privileges?.join(', ') || '--'}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="rounded-md bg-green-600 p-1.5">
                        <Icon icon={Privileges} />
                      </button>
                      {!master && (
                        <button className="rounded-md bg-red-600 p-1.5">
                          <Icon icon={Delete} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {popupOpened && (
        <Popup title="Add Role" closePopup={() => setPopupOpened(false)}>
          <AddRole
            add={({ role }) => {
              setRoles((curr) => {
                curr.push({
                  role,
                  id: Date.now(),
                  privileges: [],
                  master: false
                })
                return curr
              })
              setPopupOpened(false)
            }}
            cancel={() => setPopupOpened(false)}
          />
        </Popup>
      )}
    </div>
  )
}

export default Roles
