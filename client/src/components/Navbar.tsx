import { Icon } from '@iconify/react/dist/offline'
import Ham from '@iconify-icons/ic/twotone-menu'
import UserMenu from '../components/UserMenu'
import { NavLink } from 'react-router-dom'

const Navbar = ({
  sidsbarOpened,
  toggleSidebar
}: {
  sidsbarOpened: boolean
  toggleSidebar: () => void
}) => {
  return (
    <header
      className={`fixed left-0 top-0 z-20 w-[stretch] transition-all ${
        sidsbarOpened ? 'md:ml-[15.5rem]' : 'md:ml-[5.5rem]'
      }`}
    >
      <nav className="w-full p-5">
        <ul className="flex items-center justify-between">
          <li className="flex items-center gap-1.5">
            <button
              className="hover:bg-brand-700 -mx-1.5 rounded-full p-1.5 transition-colors"
              onClick={toggleSidebar}
            >
              <Icon icon={Ham} width={28} />
            </button>
            <h1
              className={`font-michroma flex items-center text-lg font-semibold transition-all md:hidden ${
                sidsbarOpened && 'hidden'
              }`}
            >
              <NavLink className="rounded-md p-1.5" to="/">
                PROJEX
              </NavLink>
            </h1>
          </li>

          <li>
            <UserMenu />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
