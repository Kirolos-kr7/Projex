import DropDown from './UI/DropDown'
import {
  type TaskStatus,
  type Task,
  type User
} from '../../../node_modules/@prisma/client'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import useAxios from '../hooks/useAxios'
import Search from './UI/Search'
import { getUserICon } from '../utils/helper'
import { toast } from 'react-toastify'

const NewTask = ({
  taskStatuses,
  taskStatus,
  done,
  cancel
}: {
  taskStatuses: TaskStatus[]
  taskStatus: string
  done: () => void
  cancel: () => void
}) => {
  const [step, setStep] = useState(1)
  const [users, setUsers] = useState<User[]>()
  const taskTypes = ['bugfix', 'feature', 'refactor', 'other']
  const priorities = [
    'trivial',
    'low',
    'lowest',
    'medium',
    'high',
    'highest',
    'critical',
    'blocker'
  ]
  const [task, setTask] = useState<
    Pick<Task, 'status' | 'priority' | 'type' | 'title' | 'assignedToId'>
  >({
    status: taskStatus || 'todo',
    priority: 'medium',
    type: 'feature',
    title: '',
    assignedToId: null
  })

  const getUsers = async () => {
    const { data, ok } = await useAxios('/user/all')
    if (ok) setUsers(data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const addTask = async (e: FormEvent) => {
    e.preventDefault()

    const newTask = {
      ...task,
      status: taskStatuses.find((t) => t.name == task.status)?.id
    }

    const { data, ok } = await useAxios('/tasks', {
      method: 'post',
      body: newTask
    })

    if (ok) {
      toast.success(data)
      done()
    }
  }

  return (
    <>
      <div className="my-3 flex items-center justify-center">
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-full bg-red-600 p-2.5 text-xs ${
            step == 1 &&
            'ring-2 ring-orange-400 ring-offset-2 ring-offset-black'
          }`}
        >
          1
        </span>
        <span className="-z-10 h-px w-7 rounded-full bg-red-600"></span>
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-full bg-red-600 p-2.5 text-xs ${
            step == 2 &&
            'ring-2 ring-orange-400 ring-offset-2 ring-offset-black'
          }`}
        >
          2
        </span>
      </div>

      <form
        className="sidedialog-scroller flex max-h-full flex-1 flex-col gap-3 p-4"
        onSubmit={addTask}
      >
        {step == 1 && (
          <>
            <div>
              <label htmlFor="name">Title</label>
              <input
                className="px-3 text-sm"
                type="text"
                name="name"
                id="name"
                required
                value={task.title}
                onChange={(e: ChangeEvent) =>
                  setTask((prev) => {
                    return {
                      ...prev,
                      title: (e.target as HTMLInputElement).value
                    }
                  })
                }
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="name">Status</label>
              <DropDown
                className="w-full"
                options={taskStatuses}
                selected={task.status}
                keyValue="id"
                keyName="name"
                fn={(val: TaskStatus) =>
                  setTask((prev) => {
                    return { ...prev, status: val.name }
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="name">Priority</label>
              <DropDown
                className="w-full"
                options={priorities}
                selected={task.priority}
                fn={(val) =>
                  setTask((prev) => {
                    return { ...prev, priority: val }
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="name">Type</label>
              <DropDown
                className="w-full"
                options={taskTypes}
                selected={task.type}
                fn={(val) =>
                  setTask((prev) => {
                    return { ...prev, type: val }
                  })
                }
              />
            </div>
          </>
        )}

        {step == 2 && (
          <div>
            <Search placeholder="Search Users" className="!w-full" />

            <div className="bg-brand-800 border-brand-700 mt-2 grid grid-cols-3 gap-2 rounded-lg border p-2">
              {users?.map(({ id, userName, fullName }) => (
                <button
                  type="button"
                  key={id}
                  className={`bg-brand-700 border-brand-800 flex flex-col items-center justify-center gap-1 rounded-md border py-3 px-2 text-center shadow ${
                    task.assignedToId == id && 'ring ring-red-600'
                  }`}
                  onClick={() =>
                    setTask((prev) => {
                      return {
                        ...prev,
                        assignedToId: task.assignedToId == id ? null : id
                      }
                    })
                  }
                >
                  <span className="grid h-11 w-11 place-content-center rounded-full bg-red-700 uppercase">
                    {getUserICon('KR')}
                  </span>
                  <span className="mt-1 text-sm leading-5">{fullName}</span>
                  <p className="-mt-1 text-xs text-gray-400">{userName}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </form>

      <div className="flex w-full justify-end gap-2 p-4">
        {step == 1 && (
          <button className="btn" type="button" onClick={() => setStep(2)}>
            Next
          </button>
        )}
        {step == 2 && (
          <>
            <button className="btn" type="button" onClick={() => setStep(1)}>
              Back
            </button>
            <button className="btn" onClick={addTask}>
              Save
            </button>
          </>
        )}

        <button className="btn danger" type="reset" onClick={cancel}>
          Cancel
        </button>
      </div>
    </>
  )
}

export default NewTask
