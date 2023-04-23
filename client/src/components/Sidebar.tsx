import Project from '@iconify-icons/ic/twotone-home'
import Sprint from '@iconify-icons/ph/person-simple-run-duotone'
import Board from '@iconify-icons/ic/twotone-space-dashboard'
import Code from '@iconify-icons/ic/twotone-code'
import Team from '@iconify-icons/mdi/person-group-outline'
import Notes from '@iconify-icons/ic/twotone-note-alt'
import Settings from '@iconify-icons/ic/twotone-settings'
import Logs from '@iconify-icons/mdi/math-log'
import { Icon } from '@iconify/react/dist/offline'
import { NavLink } from 'react-router-dom'
import { Dispatch, SetStateAction } from 'react'

type item = {
  name: string
  to: string
  icon: any
}

const listItems: item[] = [
  {
    name: 'Project',
    to: '/',
    icon: Project
  },
  {
    name: 'Sprint',
    to: '/sprint',
    icon: Sprint
  },
  {
    name: 'Board',
    to: '/board',
    icon: Board
  },
  {
    name: 'Code',
    to: '/code',
    icon: Code
  },
  {
    name: 'Team',
    to: '/team',
    icon: Team
  },
  {
    name: 'Notes',
    to: '/notes',
    icon: Notes
  },
  {
    name: 'Settings',
    to: '/settings',
    icon: Settings
  },
  {
    name: 'Logs',
    to: '/logs',
    icon: Logs
  }
]

const ListItem = ({
  item,
  isExpanded,
  setIsExpanded
}: {
  item: item
  isExpanded: boolean
  setIsExpanded: Dispatch<SetStateAction<boolean>>
}) => {
  const { name, to, icon } = item

  return (
    <li className="h-fit md:w-full">
      <NavLink
        onClick={() => setIsExpanded(false)}
        to={to}
        className="my-1 flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-md bg-gray-800 px-5 py-2 ring-inset transition-colors hover:bg-red-900/5 hover:text-red-400 md:h-auto md:w-full md:flex-row md:justify-start md:bg-transparent [&>*]:translate-x-0 md:[&>*]:translate-x-1"
        title={name}
      >
        <Icon icon={icon} width={28} /> <span>{isExpanded && name}</span>
      </NavLink>
    </li>
  )
}

const Sidebar = ({
  isExpanded,
  setIsExpanded
}: {
  isExpanded: boolean
  setIsExpanded: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <aside
      className={`transition-color sidebar-scroller bg-brand-900 group fixed left-0 top-0 z-20 flex h-screen w-0 flex-col items-center transition-[min-width] md:min-w-[90px] ${
        isExpanded && '!w-full md:!max-w-[250px]'
      }`}
    >
      <div>
        <h1
          className={`font-michroma mt-14 flex h-[82px] items-center px-1 font-semibold transition-all md:mt-0 ${
            isExpanded && '!text-3xl'
          }`}
        >
          DASH
        </h1>
      </div>
      <ul
        className={`nav-links flex w-full flex-row flex-wrap content-start items-start justify-center gap-x-3 gap-y-1.5 p-2 md:flex md:flex-1 md:flex-col md:items-center md:justify-start`}
      >
        {listItems.map((item) => (
          <ListItem
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            item={item}
            key={item.name}
          />
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
