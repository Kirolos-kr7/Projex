import { Roles as RolesType } from '../types'
import Search from '../components/UI/Search'
import Popup from '../components/UI/Popup'
import AddRole from '../components/AddRole'
import { useState } from 'react'

const Roles = () => {
  const [searchValue, setSearchValue] = useState('')
  const [popupOpened, setPopupOpened] = useState(false)
  const [roles, setRoles] = useState<RolesType[]>([
    {
      role: 'adminstrator',
      privileges: ['Edit Project', 'Add User', 'Remove User'],
      id: 0
    },
    {
      role: 'user',
      privileges: ['View Project'],
      id: 1
    }
  ])

  const getfilteredRoles = () => {
    if (searchValue == '') return roles

    return roles.filter(({ role, privileges }) => {
      return (
        role.toLowerCase().includes(searchValue.toLowerCase()) ||
        privileges.join(' ').toLowerCase().includes(searchValue.toLowerCase())
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
              <td className="pb-2">privileges</td>
            </tr>
          </thead>
          <tbody>
            {getfilteredRoles().map(({ role, id, privileges }) => {
              return (
                <tr key={id}>
                  <td className="flex items-center gap-2 py-1.5">{role}</td>
                  <td className="text-xs">{privileges.join(', ') || '--'}</td>
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
                curr.push({ role, id: Date.now(), privileges: [] })
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
