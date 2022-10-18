import Project from '@iconify-icons/ic/twotone-home'
import Board from '@iconify-icons/ic/twotone-space-dashboard'
import Members from '@iconify-icons/ic/twotone-people-alt'
import Arrow from '@iconify-icons/ic/twotone-arrow-circle-right'
import { Icon } from '@iconify/react/dist/offline'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <aside
      className={`flex min-h-screen min-w-[80px] flex-col items-center bg-gray-900 transition-all ${
        isExpanded && '!min-w-[280px]'
      }`}
    >
      <h1
        className={`py-3 font-mono text-3xl font-semibold transition-all ${
          isExpanded && '!py-6 !text-4xl'
        }`}
      >
        PMS
      </h1>
      <ul className="[&>li>a]:flex [&>li>a]:gap-1 [&>li>a]:items-center [&>li>a]:justify-center [&>li]:w-full  [&>li>a]:w-full [&>li>a]:transition-colors [&>li>a:hover]:text-red-400 mt-5 flex w-full flex-1 flex-col items-center gap-5  ">
        <li>
          <Link to="/" title="Project">
            <Icon icon={Project} width="28" /> {isExpanded && 'Project'}
          </Link>
        </li>
        <li>
          <Link to="/board" title="Board">
            <Icon icon={Board} width="28" /> {isExpanded && 'Board'}
          </Link>
        </li>
        <li>
          <Link to="/" title="Members">
            <Icon icon={Members} width="28" />
            {isExpanded && 'Members'}
          </Link>
        </li>
      </ul>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        title={isExpanded ? 'Contract' : 'Expand'}
        className={`mb-5 text-red-400 transition-all  ${
          isExpanded && 'rotate-180'
        }`}
      >
        <Icon icon={Arrow} width="24" />
      </button>
    </aside>
  )
}

export default Sidebar
