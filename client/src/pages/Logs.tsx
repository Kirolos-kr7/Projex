import { useEffect, useState } from 'react'
import { type Logs as LogType } from '../types'
import Log from '../components/Log'
import dayjs from 'dayjs'
import PageHeader from '../components/UI/PageHeader'
import { trpc } from '../utils/trpc'

const Logs = () => {
  const limit = 7
  const [logs, setLogs] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [max, setMax] = useState(1)
  const [isLogging, setIsLogging] = useState(false)

  const getLogs = async () => {
    setIsLogging(true)
    const data = await trpc.logs.getAll.query({ page, limit })

    const dates: any = {}

    data.forEach((d: any) => {
      const day = dayjs(d.createdAt).format('MMM DD YYYY')
      if (!dates[day]) dates[day] = [d]
      else dates[day].push(d)
    })

    setLogs(dates)
    setIsLogging(false)
  }

  const getMaxLogs = async () => {
    const data = await trpc.logs.getMaxLogs.query()
    setMax(Math.ceil(data / limit))
  }

  useEffect(() => {
    getMaxLogs()
  }, [])

  useEffect(() => {
    getLogs()
  }, [page])

  return (
    <>
      <PageHeader title="Logs" sub="Track what's going on with the app" />

      <div className="mt-10 flex flex-col">
        {logs &&
          Object.entries(logs).map(([key, value]) => {
            const day = value as LogType[]

            return (
              <div key={key}>
                <div className="mb-7 font-medium">{key.slice(0, 6)}</div>

                {day.map((log, i) => {
                  return (
                    <Log log={log} key={log.id} last={day.length - 1 == i} />
                  )
                })}
              </div>
            )
          })}
      </div>
      {true && (
        <div className="flex gap-3">
          {' '}
          <button
            className=" flex h-3 w-3 items-center justify-center rounded-xl
             bg-red-700 p-3 disabled:bg-red-400"
            onClick={() => {
              setPage((p) => p - 1)
            }}
            disabled={isLogging || page == 1}
          >
            {'<'}
          </button>
          {page} of {max - 1}
          <button
            className=" flex h-3 w-3 items-center justify-center rounded-xl bg-red-700
             p-3 disabled:bg-red-400"
            onClick={() => {
              setPage((p) => p + 1)
            }}
            disabled={isLogging || page == max - 1}
          >
            {'>'}
          </button>
        </div>
      )}
    </>
  )
}

export default Logs
