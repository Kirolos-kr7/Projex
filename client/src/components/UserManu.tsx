import Account from '@iconify-icons/line-md/account'
import Logout from '@iconify-icons/line-md/arrow-align-left'
import { Icon } from '@iconify/react/dist/offline'
import { useState } from 'react'

const UserMenu = () => {
  const [isOpened, setIsOpened] = useState(false)

  const toggle = () => {
    if (!isOpened) {
      setIsOpened(true)
      document.addEventListener('mousedown', handleMouseEvent)
      return
    }
    setIsOpened(false)
  }

  const handleMouseEvent = (e: MouseEvent) => {
    if (
      e.target != document.getElementById('user_menu') &&
      e.target != document.getElementById('user_img')
    ) {
      setIsOpened(false)
      document.removeEventListener('mousedown', handleMouseEvent)
    }
  }

  return (
    <div className="relative -mb-2">
      <button
        id="user_menu"
        className={`h-10 w-10 rounded-full outline-none ring-gray-500 transition-all focus-visible:ring ${
          isOpened && 'ring'
        }`}
      >
        <img
          id="user_img"
          className="w-inherit h-inherit rounded-[inherit]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIlzGp1laQheiAAjrbJJ3pasHLjMBnIUEZg&usqp=CAU"
          alt="user image"
          onClick={() => toggle()}
        />
      </button>

      {isOpened && (
        <ul className="absolute right-0 flex w-[200px] flex-col overflow-hidden rounded-md bg-gray-900/80">
          <li>
            <button className="flex w-full items-center gap-1.5 border-b border-gray-700/80  p-2 text-left text-sm transition-colors hover:bg-gray-700">
              <Icon icon={Account} width="20px" />
              Account
            </button>
          </li>
          <li>
            <button className="flex w-full  items-center gap-1.5 p-2 text-left  text-sm text-red-500/80 transition-colors hover:bg-gray-700/80">
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
