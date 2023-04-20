import userStore from '../stores/userStore'

const useAdmin = () => {
  const { user } = userStore()

  const isAdmin = user?.role?.role == 'admin'
  return isAdmin
}

export default useAdmin
