import { useState } from 'react'
import { Member } from '../types'
import Search from '../components/UI/Search'

const Team = () => {
  const [members] = useState<Member[]>([
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

  const getUserICon = (name: string) => {
    name = name.trim()
    const arr = name.split(' ')
    if (arr.length > 1) return arr[0][0] + arr[1][0]
    else if (name.length > 1) return name[0] + name[1]

    return name[0]
  }

  return (
    <div>
      <h1 className="page-title">Team</h1>

      <div className="mb-2 flex items-center justify-between ">
        <Search placeholder="Search names or emails" />
        <button className="base">Add Member</button>
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
            {members.map(({ id, name, email, role }) => {
              return (
                <tr key={id}>
                  <td className="flex items-center gap-2 py-1.5">
                    <span className="grid h-8 w-8 place-content-center rounded-full bg-red-700 text-xs uppercase">
                      {getUserICon(name)}
                    </span>
                    <h3>{name}</h3>
                  </td>
                  <td>{email}</td>
                  <td className="capitalize">{role}</td>
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
