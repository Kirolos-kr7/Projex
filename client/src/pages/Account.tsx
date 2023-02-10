import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { User } from '../types'

const Account = () => {
  const { user }: { user: User } = useContext(UserContext)

  return (
    <div>
      <h1 className="page-title">Account</h1>
      <div className="flex items-center gap-2">
        <div className="text-lg font-semibold">{user.name}</div>
        <span className="rounded-md bg-red-600 px-1.5 py-1 text-xs capitalize">
          {user.role?.role}
        </span>
      </div>
      <div className="">{user.email}</div>
    </div>
  )
}

export default Account
