import { type TaskPriority } from '../../../../node_modules/@prisma/client'
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
    icon = (
      <span data-tooltip="Priority: Low">
        <Icon icon={Low} className="text-3xl text-indigo-500" />
      </span>
    )
  if (p === 'lowest')
    icon = (
      <span data-tooltip="Priority: Lowest">
        <Icon icon={Lowest} className="text-2xl text-indigo-500" />
      </span>
    )
  if (p === 'medium')
    icon = (
      <span data-tooltip="Priority: Medium">
        <Icon icon={Medium} className="text-2xl text-yellow-500" />
      </span>
    )
  if (p === 'high')
    icon = (
      <span data-tooltip="Priority: High">
        <Icon icon={High} className="text-3xl text-red-500" />
      </span>
    )
  if (p === 'highest')
    icon = (
      <span data-tooltip="Priority: Highest">
        <Icon icon={Highest} className="text-2xl text-red-500" />
      </span>
    )
  if (p === 'critical')
    icon = (
      <span data-tooltip="Priority: Critical">
        <Icon icon={Critical} className="text-xl text-red-700" />
      </span>
    )
  if (p === 'blocker')
    icon = (
      <span data-tooltip="Priority: Block">
        <Icon icon={Block} className="text-xl text-red-700" />
      </span>
    )

  return (
    <div className="grid h-6 w-6 place-content-center">
      {icon ? (
        icon
      ) : (
        <span
          data-tooltip={
            p === 'trivial' ? 'Priority: Trivial' : 'Priority: null'
          }
        >
          {' '}
          <Icon icon={Trivial} className="text-xl text-gray-500" />
        </span>
      )}
    </div>
  )
}

export default Priority
