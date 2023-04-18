import { useContext } from 'react'
import { UserContext } from '../UserContext'

const useAdmin = () => {
  const { user } = useContext(UserContext)
  const isAdmin = user?.role?.role == 'admin'
  return isAdmin
}

export default useAdmin
