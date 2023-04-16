import Account from '@iconify-icons/ic/account-box'
import Logout from '@iconify-icons/ic/twotone-log-out'
import { Icon } from '@iconify/react/dist/offline'
import { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'
import { type User } from '@prisma/client'
import { trpc } from '../utils/trpc'

const UserMenu = () => {
  const { user, setUser }: { user: User; setUser: (val: User | null) => void } =
    useContext(UserContext)
  const [isOpened, setIsOpened] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseEvent)
    return () => document.removeEventListener('mouseup', handleMouseEvent)
  }, [])

  useEffect(() => {
    if (!imgRef.current) return
    const el: HTMLImageElement = imgRef.current
    el.src = user.hasProfileImage
      ? `/storage/users/${user.id}.webp`
      : '/profile-picture.jpg'
  }, [user])

  const toggle = () => {
    if (!isOpened) {
      setIsOpened(true)
      return
    }
    setIsOpened(false)
  }

  const handleMouseEvent = (e: MouseEvent) => {
    const path = e.composedPath() as [HTMLElement]
    const menuBtn = document.getElementById('user_menu') as HTMLElement
    const menuOptions = document.getElementById('opt_menu') as HTMLElement

    if (!path.includes(menuBtn) && !path.includes(menuOptions)) {
      setIsOpened(false)
    }
  }

  const logout = async () => {
    await trpc.auth.logout.query()
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
          ref={imgRef}
          alt="user image"
        />
        {user.userName && (
          <p className="mr-2 block whitespace-nowrap text-xs">
            Hey, <span className="font-semibold">{user.userName}</span>
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
