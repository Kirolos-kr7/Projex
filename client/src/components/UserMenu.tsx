import Account from '@iconify-icons/ic/account-box'
import Logout from '@iconify-icons/ic/twotone-log-out'
import { Icon } from '@iconify/react/dist/offline'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import useAxios from '../hooks/useAxios'
import { Link } from 'react-router-dom'

const UserMenu = () => {
  const { user, setUser } = useContext(UserContext)
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseEvent)
    return () => document.removeEventListener('mouseup', handleMouseEvent)
  }, [])

  const toggle = () => {
    if (!isOpened) {
      setIsOpened(true)
      return
    }
    setIsOpened(false)
  }

  const handleMouseEvent = (e: MouseEvent) => {
    const path = e.composedPath() as [HTMLElement]
    const menuBtn = document.getElementById('user_menu')
    const menuOptions = document.getElementById('opt_menu')

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!path.includes(menuBtn!) && !path.includes(menuOptions!)) {
      setIsOpened(false)
    }
  }

  const logout = async () => {
    await useAxios('/auth/logout', {
      method: 'post'
    })
    setUser(null)
  }

  return (
    <div className="relative">
      <button
        id="user_menu"
        className={`flex items-center gap-2 rounded-full outline-none transition-all focus-visible:ring ${
          isOpened && 'ring'
        }`}
        onClick={toggle}
      >
        <img
          id="user_img"
          className="h-10 w-10 rounded-full shadow"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIlzGp1laQheiAAjrbJJ3pasHLjMBnIUEZg&usqp=CAU"
          alt="user image"
        />
        {user.name && (
          <p className="mr-2 block whitespace-nowrap text-xs">
            Hey,{' '}
            <span className="font-semibold">{user?.name?.split(' ')[0]}</span>
          </p>
        )}
      </button>

      {isOpened && (
        <ul
          id="opt_menu"
          className="absolute right-0 mt-2 flex w-[200px] flex-col overflow-hidden rounded-md border border-gray-700 bg-gray-900"
        >
          <li>
            <Link to="/account" tabIndex={-1}>
              <button
                className="flex w-full items-center gap-1.5 rounded-t-md border-b border-gray-700 p-2  text-left text-sm ring-inset transition-colors hover:bg-gray-700"
                onClick={toggle}
              >
                <Icon icon={Account} width="20px" />
                Account
              </button>
            </Link>
          </li>
          <li>
            <button
              className="flex w-full items-center gap-1.5 rounded-b-md p-2 text-left text-sm  text-red-500 ring-inset transition-colors hover:bg-gray-700"
              onClick={logout}
            >
              <Icon icon={Logout} width="20px" />
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default UserMenu
