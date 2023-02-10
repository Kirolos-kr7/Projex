import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react'

function Layout() {
  const [sidsbarOpened, setSidsbarOpened] = useState(false)

  useEffect(() => {
    const isOpened = localStorage.getItem('sidebar')
    isOpened == 'true' ? setSidsbarOpened(true) : setSidsbarOpened(false)

    if (window.innerWidth < 600) setSidsbarOpened(false)
    addEventListener('resize', () => {
      if (window.innerWidth < 600) setSidsbarOpened(false)
    })
  }, [])

  const toggleSidebar = () => {
    setSidsbarOpened(!sidsbarOpened)
    localStorage.setItem('sidebar', !sidsbarOpened + '')
  }

  return (
    <>
      <Sidebar isExpanded={sidsbarOpened} />
      <main
        className={`relative min-h-screen w-[stretch] flex-1 overflow-x-hidden ${
          sidsbarOpened ? 'ml-[15.6rem]' : 'ml-[5.3rem]'
        }`}
      >
        <Navbar sidsbarOpened={sidsbarOpened} toggleSidebar={toggleSidebar} />
        <div className="mt-[4.5rem] p-5">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default Layout
