import UserMenu from './UserManu'

const Navbar = () => {
  return (
    <nav className="absolute right-0 flex justify-end p-5">
      <ul>
        <li>
          <UserMenu />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
