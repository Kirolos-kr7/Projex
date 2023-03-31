import { type Role } from '../../../node_modules/@prisma/client'
import Search from '../components/UI/Search'
import Popup from '../components/UI/Popup'
import AddRole from '../components/AddRole'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/offline'
import Privileges from '@iconify-icons/mdi/list-status'
import Delete from '@iconify-icons/mdi/delete'
import PageHeader from '../components/UI/PageHeader'
import { trpc } from '../utils/trpc'

const Roles = () => {
  const [searchValue, setSearchValue] = useState('')
  const [popupOpened, setPopupOpened] = useState(false)
  const [roles, setRoles] = useState<(Role & { privileges: any[] })[]>([])

  const getRoles = async () => {
    const data: any = await trpc.roles.getAll.query()
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
    <>
      <PageHeader title="Roles" sub="Who can do What!!" />

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
                  <td className="flex items-center gap-2 py-1.5 capitalize">
                    {role}
                  </td>
                  <td className="text-xs">{privileges?.join(', ') || '--'}</td>
                  <td>
                    <div className="-mx-1">
                      <button className="icon-btn">
                        <Icon
                          icon={Privileges}
                          className="text-green-600"
                          width="20"
                        />
                      </button>
                      {!master && (
                        <button className="icon-btn">
                          <Icon
                            icon={Delete}
                            className="text-red-600"
                            width="20"
                          />
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

      <Popup
        title="Add Role"
        open={popupOpened}
        closePopup={() => setPopupOpened(false)}
      >
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
    </>
  )
}

export default Roles
