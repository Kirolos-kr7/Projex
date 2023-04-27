import DropDown from '../UI/DropDown'
import {
  type TaskStatus,
  type Task,
  type User,
  TaskWithIncludes
} from '../../types'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Search from '../UI/Search'
import { getUserICon, handleError } from '../../utils/helper'
import { trpc } from '../../utils/trpc'
import { motion, AnimatePresence } from 'framer-motion'

enum STEPS {
  BASE,
  USERS
}

const TaskVariant = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: 10, opacity: 0 }
}

const TaskDialog = ({
  task,
  taskStatuses,
  taskStatus,
  done,
  cancel
}: {
  task?: TaskWithIncludes
  taskStatuses: TaskStatus[]
  taskStatus: string
  done: () => void
  cancel: () => void
}) => {
  const [step, setStep] = useState<STEPS>(STEPS.BASE)
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
            step == STEPS.BASE &&
            'ring-2 ring-orange-400 ring-offset-2 ring-offset-black transition-all'
          }`}
        >
          1
        </span>
        <span className="-z-10 h-px w-7 rounded-full bg-red-600"></span>
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-full bg-red-600 p-2.5 text-xs ${
            step == STEPS.USERS &&
            'ring-2 ring-orange-400 ring-offset-2 ring-offset-black transition-all'
          }`}
        >
          2
        </span>
      </div>

      <motion.form
        transition={{ staggerChildren: 1 }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex max-h-full flex-1 flex-col gap-3 overflow-hidden p-4"
        onSubmit={saveTask}
      >
        <AnimatePresence>
          {step == STEPS.BASE && (
            <motion.div
              variants={TaskVariant}
              className="sidedialog-scroller -mx-1 flex flex-col gap-3 px-1"
            >
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
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step == STEPS.USERS && (
            <motion.div
              variants={TaskVariant}
              className="flex h-full flex-1 flex-col"
            >
              <Search placeholder="Search Users" className="!w-full" />

              <div className="bg-brand-800 sidedialog-scroller border-brand-700 mt-2 grid grid-cols-3 items-start gap-2 rounded-lg border p-2">
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>

      {task?.createdBy && (
        <div className="w-full px-3">
          <span className="block w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-sm">
            Task created by: {task?.createdBy?.userName}
          </span>
        </div>
      )}

      <div className="flex w-full justify-end gap-2 p-4">
        {step == STEPS.BASE && (
          <button
            className="btn"
            type="button"
            onClick={() => setStep(STEPS.USERS)}
          >
            Next
          </button>
        )}
        {step == STEPS.USERS && (
          <>
            <button
              className="btn"
              type="button"
              onClick={() => setStep(STEPS.BASE)}
            >
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
