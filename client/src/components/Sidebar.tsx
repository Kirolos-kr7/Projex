import Project from '@iconify-icons/ic/twotone-home'
import Board from '@iconify-icons/ic/twotone-space-dashboard'
import Code from '@iconify-icons/ic/twotone-code'
import Team from '@iconify-icons/mdi/person-group-outline'
import Notes from '@iconify-icons/ic/twotone-note-alt'
import Settings from '@iconify-icons/ic/twotone-settings'
import Logs from '@iconify-icons/mdi/math-log'
import { Icon } from '@iconify/react/dist/offline'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ isExpanded }: { isExpanded: boolean }) => {
  return (
    <aside
      className={`transition-color sidebar-scroller bg-brand-900 group fixed left-0 top-0 z-20 flex h-screen min-w-[70px] flex-col items-center transition-[min-width] ${
        isExpanded && '!min-w-[250px]'
      }`}
    >
      <div>
        <h1
          className={`font-michroma flex h-[82px] items-center px-1 font-semibold transition-all ${
            isExpanded && '!text-3xl'
          }`}
        >
          DASH
        </h1>
      </div>
      <ul
        className={`nav-links flex w-full flex-1 flex-col items-center p-2 [&>li>a:hover]:bg-red-900/5 [&>li>a:hover]:text-red-400 [&>li>a]:my-1 [&>li>a]:flex [&>li>a]:w-full [&>li>a]:items-center [&>li>a]:gap-2 [&>li>a]:rounded-md [&>li>a]:px-5 [&>li>a]:py-2 [&>li>a]:transition-colors [&>li>a]:sm:px-5 [&>li]:w-full`}
      >
        <li>
          <NavLink to="/" className="ring-inset" title="Project">
            <Icon icon={Project} width="28" /> {isExpanded && 'Project'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/board" className="ring-inset" title="Board">
            <Icon icon={Board} width="28" /> {isExpanded && 'Board'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/code" className="ring-inset" title="Code">
            <Icon icon={Code} width="28" />
            {isExpanded && 'Code'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/team" className="ring-inset" title="Team">
            <Icon icon={Team} width="28" />
            {isExpanded && 'Team'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/notes" className="ring-inset" title="Notes">
            <Icon icon={Notes} width="28" />
            {isExpanded && 'Notes'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className="ring-inset" title="Settings">
            <Icon icon={Settings} width="28" />
            {isExpanded && 'Settings'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/logs" className="ring-inset" title="Logs">
            <Icon icon={Logs} width="28" />
            {isExpanded && 'Logs'}
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
