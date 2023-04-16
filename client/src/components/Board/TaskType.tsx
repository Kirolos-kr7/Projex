import Bug from '@iconify-icons/ic/twotone-bug-report'
import Clean from '@iconify-icons/ic/twotone-cleaning-services'
import Feature from '@iconify-icons/ic/twotone-auto-awesome'
import QM from '@iconify-icons/ic/twotone-question-mark'
import { Icon } from '@iconify/react/dist/offline'
import { type TaskType as TT } from '../@prisma/client'

const TaskType = ({ type }: { type: TT }) => {
  if (type === 'bugfix')
    return (
      <Icon icon={Bug} width="20px" className="rounded-md bg-red-800 p-0.5" />
    )

  if (type === 'refactor')
    return (
      <Icon
        icon={Clean}
        width="20px"
        className="rounded-md bg-green-800 p-0.5"
      />
    )

  if (type === 'feature')
    return (
      <Icon
        icon={Feature}
        width="20px"
        className="rounded-md bg-indigo-800 p-0.5"
      />
    )

  return (
    <Icon icon={QM} width="20px" className="rounded-md bg-yellow-500 p-0.5" />
  )
}

export default TaskType
