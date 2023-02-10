import { Icon } from '@iconify/react/dist/offline'
import Ham from '@iconify-icons/ic/twotone-menu'
import UserMenu from '../components/UserMenu'

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
        sidsbarOpened ? 'ml-[15.5rem]' : 'ml-[5.5rem]'
      }`}
    >
      <nav className="w-full p-5">
        <ul className="flex items-center justify-between">
          <li>
            <button
              className="hover:bg-brand-700 -mx-1.5 rounded-full p-1.5 transition-colors"
              onClick={toggleSidebar}
            >
              <Icon icon={Ham} width={28} />
            </button>
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
