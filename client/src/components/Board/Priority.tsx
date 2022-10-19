import { TaskPriority } from '../../types'
import Trivial from '@iconify-icons/ic/outline-circle'
import Low from '@iconify-icons/ic/sharp-keyboard-arrow-down'
import Lowest from '@iconify-icons/ic/sharp-keyboard-double-arrow-down'
import High from '@iconify-icons/ic/sharp-keyboard-arrow-up'
import Highest from '@iconify-icons/ic/sharp-keyboard-double-arrow-up'
import Medium from '@iconify-icons/heroicons/bars-2'
import Critical from '@iconify-icons/ph/arrow-fat-line-up-fill'
import Block from '@iconify-icons/ic/block'
import { Icon } from '@iconify/react/dist/offline'

const Priority = ({ p }: { p: TaskPriority }) => {
  let icon

  if (p === 'low')
    icon = <Icon icon={Low} className="text-3xl text-indigo-500" />
  if (p === 'lowest')
    icon = <Icon icon={Lowest} className="text-2xl text-indigo-500" />
  if (p === 'medium')
    icon = <Icon icon={Medium} className="text-2xl text-yellow-500" />
  if (p === 'high')
    icon = <Icon icon={High} className="text-3xl text-red-500" />
  if (p === 'highest')
    icon = <Icon icon={Highest} className="text-2xl text-red-500" />
  if (p === 'critical')
    icon = <Icon icon={Critical} className="text-xl text-red-700" />
  if (p === 'blocker')
    icon = <Icon icon={Block} className="text-xl text-red-700" />

  return (
    <div className="grid h-6 w-6 place-content-center">
      {icon ? icon : <Icon icon={Trivial} className="text-xl text-gray-500" />}
    </div>
  )
}

export default Priority
