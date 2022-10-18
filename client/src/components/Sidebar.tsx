import { useState } from 'react'

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <aside
      className={`bg-gray-900 flex flex-col items-center min-w-[80px] min-h-screen p-3 transition-all ${
        isExpanded && '!min-w-[280px]'
      }`}
    >
      <h1
        className={`font-mono font-semibold transition-all text-3xl py-3 ${
          isExpanded && '!py-6 !text-4xl'
        }`}
      >
        App
      </h1>
      <ul className="flex-1">
        <li>a</li>
        <li>ba</li>
        <li>cc</li>
        <li>sd</li>
        <li>lk</li>
      </ul>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`transition-all  ${isExpanded && 'rotate-180'}`}
      >{`>`}</button>
    </aside>
  )
}

export default Sidebar
