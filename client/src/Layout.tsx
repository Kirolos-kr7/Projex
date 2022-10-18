import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        <Navbar />
        <div className="p-5">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
