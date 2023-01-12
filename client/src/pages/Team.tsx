import { useEffect, useState } from 'react'
import { Member, Role } from '../types'
import Search from '../components/UI/Search'
import DropDown from '../components/UI/DropDown'
import Popup from '../components/UI/Popup'
import AddMember from '../components/AddMember'
// import { UserContext } from '../UserContext'
import useAxios from '../hooks/useAxios'
import { Icon } from '@iconify/react/dist/offline'
import Delete from '@iconify-icons/mdi/delete-outline'

const Team = () => {
  // const { user } = useContext(UserContext)
  // console.log(user)

  const [searchValue, setSearchValue] = useState('')
  const [popupOpened, setPopupOpened] = useState(false)
  const [members, setMembers] = useState<Member[]>([])
  const [roles, setRoles] = useState<Role[]>([])

  const getData = async () => {
    const { data: m } = await useAxios({ path: '/user/all' })
    const { data: r } = await useAxios({ path: '/roles' })
    setMembers(m)
    setRoles(r)
  }

  useEffect(() => {
    getData()
  }, [])

  const getUserICon = (name: string) => {
    name = name.trim()
    const arr = name.split(' ')
    if (arr.length > 1) return arr[0][0] + arr[1][0]
    else if (name.length > 1) return name[0] + name[1]

    return name[0]
  }

  const getFilteredMembers = () => {
    if (searchValue == '') return members

    return members.filter(({ name, email }) => {
      return (
        name.toLowerCase().includes(searchValue.toLowerCase()) ||
        email.toLowerCase().includes(searchValue.toLowerCase())
      )
    })
  }

  return (
    <div>
      <h1 className="page-title">Team</h1>

      <div className="mb-2 flex items-center justify-between ">
        <Search
          placeholder="Search members"
          update={(val) => setSearchValue(val)}
        />
        <button className="btn base" onClick={() => setPopupOpened(true)}>
          Add Member
        </button>
      </div>

      <div className="rounded-md bg-gray-900 p-3">
        <table className="w-full">
          <thead className="text-xs text-gray-400">
            <tr>
              <td className="pb-2">Name</td>
              <td className="pb-2">Email</td>
              <td className="pb-2">Role</td>
              <td className="pb-2">Actions</td>
            </tr>
          </thead>
          <tbody>
            {getFilteredMembers().map(({ id, name, email, role }) => {
              return (
                <tr key={id}>
                  <td className="flex items-center gap-2 py-1.5">
                    <span className="grid h-8 w-8 place-content-center rounded-full bg-red-700 text-xs uppercase">
                      {getUserICon(name)}
                    </span>
                    <h3>{name}</h3>
                  </td>
                  <td>{email}</td>
                  <td>
                    <DropDown
                      selected={role.role}
                      options={roles}
                      keyValue="role"
                      fn={(value) =>
                        setMembers((curr) => {
                          return curr?.map((m: Member) => {
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

      {popupOpened && (
        <Popup title="Add Member" closePopup={() => setPopupOpened(false)}>
          <AddMember
            roles={roles}
            add={(user) => {
              setMembers((curr) => {
                curr.push(user)
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

export default Team
