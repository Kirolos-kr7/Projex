import { useEffect, useState } from 'react'
import { Tooltip, PieChart, Pie, Cell } from 'recharts'
import { trpc } from '../../utils/trpc'

const DailyWork = () => {
  const colors = ['#82ca9d', '#00f00f', '#ff0ff0', '#f0ff0f']
  const [statuses, setStatuses] =
    useState<{ id: string; name: string; count: number }[]>()

  const getBoardStatus = async () => {
    const data = await trpc.tasks.getBoardStatus.query()
    setStatuses(data)
  }

  useEffect(() => {
    getBoardStatus()
  }, [])

  return (
    <div className="flex flex-col justify-between">
      <h2 className="text-xl font-semibold">Board Status</h2>

      <div className="mx-auto">
        <PieChart width={250} height={250}>
          <Pie data={statuses} dataKey="count">
            {statuses?.map(({ name, id }, i) => (
              <Cell id={id} stroke="0" key={name} fill={colors[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div className="grid grid-cols-2 md:hidden">
        {statuses?.map(({ name, id, count }, i) => (
          <div key={id} className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-md"
              style={{ background: colors[i] }}
            />
            <span>
              {name} [{count}]
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyWork
