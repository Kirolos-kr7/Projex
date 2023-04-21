import { BarChart, Bar, ResponsiveContainer } from 'recharts'
import { trpc } from '../../utils/trpc'
import { useEffect, useState } from 'react'
import moment from 'moment'

const DailyWork = () => {
  const [daily, setDaily] = useState<{ createdOn: string; count: number }[]>()

  const getDailyWork = async () => {
    const dp = await trpc.logs.dailyProgress.query()

    setDaily(
      dp.map(({ createdOn, count }) => {
        createdOn = moment(createdOn).toNow()

        return { createdOn, count }
      })
    )
  }

  useEffect(() => {
    getDailyWork()
  }, [])

  return (
    <div className="flex flex-col justify-between ">
      <h2 className="text-xl font-semibold">Daily Progress</h2>

      <ResponsiveContainer className="mt-5" height={90}>
        <BarChart barSize={5} data={daily}>
          <Bar dataKey="count" className="fill-slate-300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DailyWork
