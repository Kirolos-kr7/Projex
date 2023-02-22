import { useEffect, useState } from 'react'
import { Log as LogType } from '../types'
import useAxios from '../hooks/useAxios'
import { toast } from 'react-toastify'
import Log from '../components/Log'
import dayjs from 'dayjs'
import PageHeader from '../components/UI/PageHeader'

const Logs = () => {
  const [logs, setLogs] = useState<any>()

  const getLogs = async () => {
    const { data, ok } = await useAxios('/logs')

    const dates: any = {}

    data.forEach((d: LogType) => {
      const day = dayjs(d.createdAt).format('MMM DD YYYY')
      if (!dates[day]) dates[day] = [d]
      else dates[day].push(d)
    })

    if (ok) setLogs(dates)
    else toast.error(data)
  }

  useEffect(() => {
    getLogs()
  }, [])

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
    </>
  )
}

export default Logs
