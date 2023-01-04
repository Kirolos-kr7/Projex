import Project from '@iconify-icons/ic/twotone-home'
import Board from '@iconify-icons/ic/twotone-space-dashboard'
import Code from '@iconify-icons/ic/twotone-code'
import Team from '@iconify-icons/ic/twotone-people-alt'
import Arrow from '@iconify-icons/ic/twotone-arrow-circle-right'
import Settings from '@iconify-icons/ic/twotone-settings'
import { Icon } from '@iconify/react/dist/offline'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean | null>(null)

  useEffect(() => {
    const isOpened = localStorage.getItem('sidebar')
    isOpened == 'true' ? setIsExpanded(true) : setIsExpanded(false)

    if (window.innerWidth < 600) setIsExpanded(false)
    addEventListener('resize', () => {
      if (window.innerWidth < 600) setIsExpanded(false)
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('sidebar', isExpanded + '')
  }, [isExpanded])

  return typeof isExpanded == 'boolean' ? (
    <aside
      className={`transition-color group relative flex min-h-screen min-w-[70px] flex-col items-center bg-gray-900 transition-[min-width] ${
        isExpanded && '!min-w-[250px]'
      }`}
    >
      <h1
        className={`font-michroma flex h-[82px] items-center px-1 text-xl font-semibold transition-all ${
          isExpanded && '!text-4xl'
        }`}
      >
        PMS
      </h1>
      <ul
        className={`nav-links mt-5 flex w-full flex-1 flex-col items-center [&>li>a]:flex  [&>li>a]:w-full [&>li>a]:items-center [&>li>a]:gap-2 [&>li>a]:border-b [&>li>a]:border-gray-800 [&>li>a]:py-3 [&>li>a]:px-5 [&>li>a]:transition-colors [&>li>a]:sm:px-8 [&>li:last-of-type>a]:border-b-0 [&>li>a:hover]:bg-red-900/5 [&>li>a:hover]:text-red-400 [&>li]:w-full`}
      >
        <li>
          <NavLink to="/" className=" ring-inset" title="Project">
            <Icon icon={Project} width="28" /> {isExpanded && 'Project'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/board" className=" ring-inset" title="Board">
            <Icon icon={Board} width="28" /> {isExpanded && 'Board'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/code" className=" ring-inset" title="Code">
            <Icon icon={Code} width="28" />
            {isExpanded && 'Code'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/team" className=" ring-inset" title="Team">
            <Icon icon={Team} width="28" />
            {isExpanded && 'Team'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className=" ring-inset" title="Settings">
            <Icon icon={Settings} width="28" />
            {isExpanded && 'Settings'}
          </NavLink>
        </li>
      </ul>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        title={isExpanded ? 'Contract' : 'Expand'}
        className={` absolute bottom-5 -right-3 rounded-full bg-red-800 text-red-400 opacity-0 ring-inset transition-all focus-visible:opacity-100 group-hover:opacity-100 ${
          isExpanded && 'rotate-180'
        }`}
      >
        <Icon icon={Arrow} width="24" />
      </button>
    </aside>
  ) : (
    <aside></aside>
  )
}

export default Sidebar
