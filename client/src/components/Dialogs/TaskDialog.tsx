import DropDown from '../UI/DropDown'
import { type TaskStatus, type Task, type User } from '../../types'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Search from '../UI/Search'
import { getUserICon, handleError } from '../../utils/helper'
import { trpc } from '../../utils/trpc'

const TaskDialog = ({
  task,
  taskStatuses,
  taskStatus,
  done,
  cancel
}: {
  task?: Task
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
  const [newTask, setNewTask] = useState<Partial<Task>>({
    status: taskStatus || 'todo',
    priority: 'medium',
    type: 'feature',
    title: '',
    assignedToId: null
  })

  const getUsers = async () => {
    const data: any = await trpc.users.getAll.query()
    setUsers(data)
  }

  useEffect(() => {
    if (task) {
      const taskWithCorrectStatus = structuredClone(task)
      taskWithCorrectStatus.status =
        taskStatuses.find((t) => t.id == task.status)?.name || taskStatus
      setNewTask(taskWithCorrectStatus)
    }

    getUsers()
  }, [])

  const saveTask = async (e: FormEvent) => {
    e.preventDefault()

    const taskProps = {
      ...newTask,
      status: taskStatuses.find((t) => t.name == newTask.status)?.id
    }

    try {
      taskProps.id
        ? await trpc.tasks.editTask.mutate(taskProps as any)
        : await trpc.tasks.createTask.mutate(taskProps as any)
      done()
    } catch (err) {
      handleError(err)
    }
  }

  return (
    <>
      <div className="my-3 flex items-center justify-center">
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-full bg-red-600 p-2.5 text-xs ${
            step == 1 &&
            'ring-2 ring-orange-400 ring-offset-2 ring-offset-black transition-all'
          }`}
        >
          1
        </span>
        <span className="-z-10 h-px w-7 rounded-full bg-red-600"></span>
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-full bg-red-600 p-2.5 text-xs ${
            step == 2 &&
            'ring-2 ring-orange-400 ring-offset-2 ring-offset-black transition-all'
          }`}
        >
          2
        </span>
      </div>

      <form
        className="sidedialog-scroller flex max-h-full flex-1 flex-col gap-3 p-4"
        onSubmit={saveTask}
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
                value={newTask.title}
                onChange={(e: ChangeEvent) =>
                  setNewTask((prev) => {
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
                buttonStyle="w-full"
                options={taskStatuses}
                selected={newTask.status}
                keyValue="id"
                keyName="name"
                fn={(val: TaskStatus) =>
                  setNewTask((prev) => {
                    return { ...prev, status: val.name }
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="name">Priority</label>
              <DropDown
                buttonStyle="w-full"
                options={priorities}
                selected={newTask.priority}
                fn={(val) =>
                  setNewTask((prev) => {
                    return { ...prev, priority: val }
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="name">Type</label>
              <DropDown
                buttonStyle="w-full"
                options={taskTypes}
                selected={newTask.type}
                fn={(val) =>
                  setNewTask((prev) => {
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
                  className={`bg-brand-700 border-brand-800 flex flex-col items-center justify-center gap-1 rounded-md border px-2 py-3 text-center shadow ${
                    newTask.assignedToId == id && 'ring ring-red-600'
                  }`}
                  onClick={() =>
                    setNewTask((prev) => {
                      return {
                        ...prev,
                        assignedToId: newTask.assignedToId == id ? null : id
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
            <button className="btn" onClick={saveTask}>
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

export default TaskDialog
