import dayjs from 'dayjs'
import { type Logs as LogType } from '../../../node_modules/@prisma/client'

const Log = ({ log, last }: { log: LogType; last: boolean }) => {
  const { message, createdAt } = log

  return (
    <>
      <div
        className={`relative flex items-start gap-1.5 ${
          !last &&
          'before:absolute before:left-[7.5px] before:-z-10 before:block before:h-full before:w-px before:bg-gray-400'
        }`}
      >
        <span className="aspect-square h-4 w-4 rounded-full border-4 border-[#101010] bg-red-600" />
        <div className="-mt-2.5 mb-3 flex-col">
          <div className="-mb-0.5 text-xs text-gray-400">
            {dayjs(createdAt).format('hh:mm')}
          </div>
          <p className="mb-3">{message}</p>
        </div>
      </div>
    </>
  )
}

export default Log
