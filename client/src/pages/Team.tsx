import { useState } from 'react'
import { Member, UserRole } from '../types'
import Search from '../components/UI/Search'
import DropDown from '../components/UI/DropDown'
import Popup from '../components/UI/Popup'
import AddMember from '../components/AddMember'

const Team = () => {
  const [searchValue, setSearchValue] = useState('')
  const [popupOpened, setPopupOpened] = useState(false)
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: 'Kirolos Rafaat',
      email: 'k@k.co',
      role: 'adminstrator'
    },
    {
      id: 2,
      name: 'Mark',
      email: 'mk@k.co',
      role: 'user'
    },
    {
      id: 3,
      name: 'Alex Jones',
      email: 'aj@k.co',
      role: 'user'
    }
  ])

  const [roles] = useState<UserRole[]>([
    'adminstrator',
    'user',
    'person',
    'human'
  ])

  const getUserICon = (name: string) => {
    name = name.trim()
    const arr = name.split(' ')
    if (arr.length > 1) return arr[0][0] + arr[1][0]
    else if (name.length > 1) return name[0] + name[1]

    return name[0]
  }

  const getfilteredMembers = () => {
    if (searchValue == '') return members

    return members.filter((mamber) => {
      return (
        mamber.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        mamber.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        mamber.role.toLowerCase().includes(searchValue.toLowerCase())
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
        <button className="base" onClick={() => setPopupOpened(true)}>
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
            </tr>
          </thead>
          <tbody>
            {getfilteredMembers().map(({ id, name, email, role }) => {
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
                      selected={role}
                      options={roles}
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
