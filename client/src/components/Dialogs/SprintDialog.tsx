import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { Sprint } from '../../types'
import { handleError } from '../../utils/helper'
import { trpc } from '../../utils/trpc'
import { DateRange, Range } from 'react-date-range'
import dayjs from 'dayjs'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import '../../assets/date-range-override.css'

enum STEPS {
  BASE,
  DATES
}

const SprintDialog = ({
  sprint,
  lastSprintId,
  done,
  cancel
}: {
  sprint: Sprint | undefined
  lastSprintId: string
  done: () => void
  cancel: () => void
}) => {
  const [err, setErr] = useState('')
  const [length, setLength] = useState(0)
  const [step, setStep] = useState<STEPS>(STEPS.BASE)
  const [data, setData] = useState({
    name: '',
    goal: ''
  })
  const [dateRange, setDateRange] = useState<Range>({
    startDate: dayjs().toDate(),
    endDate: dayjs().add(7, 'd').toDate(),
    key: 'selection'
  })

  useEffect(() => {
    const nextSprint = lastSprintId ? parseInt(lastSprintId) + 1 : 1

    setStep(STEPS.BASE)
    setData({
      name: sprint ? sprint?.name : `Sprint ${nextSprint}`,
      goal: sprint ? sprint?.goal : ''
    })
    setDateRange({
      startDate: sprint?.startDate
        ? dayjs(sprint.startDate).toDate()
        : dateRange.startDate,
      endDate: sprint?.endDate
        ? dayjs(sprint.endDate).toDate()
        : dateRange.endDate,
      key: 'selection'
    })
  }, [sprint, lastSprintId])

  useEffect(() => {
    setLength(data.goal.length)
  }, [data.goal])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErr('')

    if (step == STEPS.BASE) return setStep(STEPS.DATES)

    try {
      if (sprint) {
        try {
          await trpc.sprints.edit.mutate({
            ...data,
            startDate: dayjs(dateRange.startDate).toString(),
            endDate: dayjs(dateRange.endDate).toString(),
            id: sprint.id
          })
          toast.success('Updated sprint')
        } catch (err) {
          handleError(err)
        }
      } else {
        try {
          await trpc.sprints.create.mutate({
            ...data,
            startDate: dayjs(dateRange.startDate).toString(),
            endDate: dayjs(dateRange.endDate).toString()
          })
          toast.success('Added sprint')
        } catch (err) {
          handleError(err)
        }
      }
      done()
    } catch (err: any) {
      setErr(err)
    }
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div>
        {err && (
          <span className="mb-2 rounded-md bg-red-800 p-2.5 ">{err}</span>
        )}

        <div className="my-3 flex items-center justify-center">
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full bg-red-600 p-2.5 text-xs ${
              step == STEPS.BASE &&
              'ring-2 ring-orange-400 ring-offset-2 ring-offset-black transition-all'
            }`}
          >
            1
          </span>
          <span className="-z-10 h-px w-7 rounded-full bg-red-600"></span>
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full bg-red-600 p-2.5 text-xs ${
              step == STEPS.DATES &&
              'ring-2 ring-orange-400 ring-offset-2 ring-offset-black transition-all'
            }`}
          >
            2
          </span>
        </div>

        {step == STEPS.BASE && (
          <div className="mb-3 flex flex-col gap-3">
            <div>
              <label htmlFor="name">Name</label>
              <input
                className="px-3 text-sm"
                type="text"
                name="name"
                id="name"
                autoFocus
                required
                value={data.name}
                onChange={(e) =>
                  setData((p) => ({
                    ...p,
                    name: (e.target as HTMLInputElement).value
                  }))
                }
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="goal">Goal</label>
              <textarea
                className="px-3 text-sm"
                name="goal"
                id="goal"
                value={data.goal}
                onChange={(e) =>
                  setData((p) => ({
                    ...p,
                    goal: (e.target as HTMLTextAreaElement).value
                  }))
                }
              />
              <span className="mt-2 self-end text-sm text-gray-400">
                {length + ' of 255'}
              </span>
            </div>
          </div>
        )}

        {step == STEPS.DATES && (
          <div>
            <label htmlFor="dateRange">Date Range</label>

            <DateRange
              ranges={[dateRange]}
              onChange={(item) => setDateRange(item.selection)}
              moveRangeOnFirstSelection={false}
              rangeColors={['#f34141']}
            />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        {step == STEPS.BASE && <button className="btn">Next</button>}
        {step == STEPS.DATES && (
          <button
            className="btn"
            type="button"
            onClick={() => setStep(STEPS.BASE)}
          >
            Previous
          </button>
        )}
        {step == STEPS.DATES && <button className="btn">Save</button>}
        <button className="btn danger" type="reset" onClick={() => cancel()}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default SprintDialog
