import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react'

function Layout() {
  const [sidsbarOpened, setSidsbarOpened] = useState(false)

  useEffect(() => {
    const isOpened = localStorage.getItem('sidebar')

    if (isOpened == 'true' && window.innerWidth > 768) setSidsbarOpened(true)
    else {
      setSidsbarOpened(false)
      localStorage.setItem('sidebar', 'false')
    }
  }, [])

  const toggleSidebar = () => {
    setSidsbarOpened(!sidsbarOpened)
    localStorage.setItem('sidebar', !sidsbarOpened + '')
  }

  return (
    <>
      <Sidebar isExpanded={sidsbarOpened} setIsExpanded={setSidsbarOpened} />
      <main
        className={`relative min-h-screen w-[stretch] flex-1 overflow-x-hidden ${
          sidsbarOpened ? 'md:ml-[15.6rem]' : 'md:ml-[5.3rem]'
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
