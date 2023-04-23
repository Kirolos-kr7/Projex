import dayjs from 'dayjs'
import type { Sprint } from '../types'
import Button from './UI/Button'

interface SprintBoxProps {
  sprint: Sprint
  active: boolean
  cas: (value: string) => void
}

const SprintBox = ({ sprint, active, cas }: SprintBoxProps) => {
  const { id, name, goal, startDate, endDate } = sprint

  const formatDate = (d: any) => dayjs(d).format('MMM D YYYY')

  return (
    <div className="bg-brand-800 flex flex-col gap-1 rounded-md border border-gray-800 p-2.5">
      <h2 className="text-lg font-semibold">{name}</h2>
      {goal && <p className="mb-2 text-gray-400">{goal}</p>}

      <div className="mb-3 grid grid-cols-[auto,1fr] gap-x-2">
        <span className="font-semibold">From </span>
        <span className="text-gray-400">{formatDate(startDate)}</span>
        <span className="font-semibold">To </span>
        <span className="text-gray-400">{formatDate(endDate)}</span>
      </div>

      <Button
        pending={false}
        type={active ? 'danger' : undefined}
        onClick={() => cas(String(id))}
      >
        {active ? 'Deactivate' : 'Activate'}
      </Button>
    </div>
  )
}

export default SprintBox
