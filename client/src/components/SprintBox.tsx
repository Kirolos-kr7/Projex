import dayjs from 'dayjs'
import type { Sprint } from '../types'
import Button from './UI/Button'
import { Icon } from '@iconify/react/dist/offline'
import Delete from '@iconify-icons/ic/delete'
import { motion } from 'framer-motion'

interface SprintBoxProps {
  sprint: Sprint
  active: boolean
  i: number
  cas: (value: string) => void
  edit: (value: number) => void
  remove: (value: number) => void
}

const SprintVariant = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: 0.1 * i
    }
  })
}

const SprintBox = ({
  sprint,
  active,
  i,
  cas,
  edit,
  remove
}: SprintBoxProps) => {
  const { id, name, goal, startDate, endDate } = sprint

  const formatDate = (d: any) => dayjs(d).format('MMM D YYYY')

  return (
    <motion.div
      variants={SprintVariant}
      custom={i}
      initial="hidden"
      animate="visible"
      className="bg-brand-800 flex flex-col justify-between gap-1 rounded-md border border-gray-800 p-2.5"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="mb-2 text-sm text-gray-400">{goal}</p>
          </div>

          <button className="icon-btn" onClick={() => remove(id)}>
            <Icon icon={Delete} className="text-red-600" width="20" />
          </button>
        </div>

        <div className="mb-3 grid grid-cols-[auto,1fr] gap-x-2 text-sm">
          <span className="font-semibold">From </span>
          <span className="text-gray-400">{formatDate(startDate)}</span>
          <span className="font-semibold">To </span>
          <span className="text-gray-400">{formatDate(endDate)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 [&>button]:w-full">
        <Button
          type={active ? 'danger' : undefined}
          onClick={() => cas(String(id))}
        >
          {active ? 'Deactivate' : 'Activate'}
        </Button>
        <Button onClick={() => edit(id)}>Edit</Button>
      </div>
    </motion.div>
  )
}

export default SprintBox
