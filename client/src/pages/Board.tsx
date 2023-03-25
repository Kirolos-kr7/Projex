import { useEffect, useState } from 'react'
import {
  type Task as TypeTask,
  type TaskStatus,
  type User
} from '../../../node_modules/@prisma/client'
import Add from '@iconify-icons/ic/add'
import { Icon } from '@iconify/react/dist/offline'
import Editable from '../components/UI/Editable'
import Search from '../components/UI/Search'
import SideDialog from '../components/SideDialog'
import NewTask from '../components/NewTask'
import useAxios from '../hooks/useAxios'
import { toast } from 'react-toastify'
import PageHeader from '../components/UI/PageHeader'
import Priority from '../components/Board/Priority'
import TaskType from '../components/Board/TaskType'
import { pulseAnim } from '../utils/helper'
import Tooltip from '../components/UI/Tooltip'

const Board = () => {
  const [popupOpened, setPopupOpened] = useState(false)
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([])
  const [tasks, setTasks] = useState<TypeTask[]>([])
  const [taskStatus, setTaskStatus] = useState('')
  const [dragging, setDragging] = useState('')
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const getTasks = async () => {
    const { data, ok } = await useAxios('/tasks')
    if (ok) setTasks(data.tasks)
    else toast.error(data)
  }

  const getTaskStatuses = async () => {
    const { data, ok } = await useAxios('/tasks/statuses')
    if (ok) setTaskStatuses(data.taskStatuses.reverse())
    else toast.error(data)
  }

  useEffect(() => {
    getTasks()
    getTaskStatuses()
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging])

  const handleMouseMove = (e: MouseEvent) => {
    const el = document.getElementById(`task_${dragging}`)
      ?.children[0] as HTMLElement

    if (!dragging || !el) return

    el.classList.add('absolute', '!z-50', 'pointer-events-none')
    el.animate(
      [
        {
          left: `${e.clientX + offset.x}px`,
          top: `${e.clientY + offset.y}px`
        }
      ],
      {
        easing: 'ease-in-out',
        duration: 50,
        fill: 'forwards'
      }
    )
  }

  const handleMouseUp = (e: MouseEvent) => {
    const el = document.getElementById(`task_${dragging}`)
      ?.children[0] as HTMLElement

    if (!el) return

    el.classList.remove('absolute', '!z-50', 'pointer-events-none')
    el.animate(
      [
        {
          left: 'auto',
          top: 'auto'
        }
      ],
      {
        fill: 'forwards'
      }
    )

    const isIn = e.composedPath().find((x) => {
      return (x as HTMLElement).id?.startsWith('dropzone')
    })
    const dropZoneId = (isIn as HTMLElement)?.dataset.dropzone

    updateTaskStatus(dropZoneId, dragging)

    setDragging('')
    setOffset({ x: 0, y: 0 })
  }

  const updateTaskStatus = async (
    statusId: string | undefined,
    taskId: string
  ) => {
    if (!statusId) return false

    const tsk = tasks.find((t) => t.id == taskId)
    if (tsk?.status == statusId) return false

    setTasks((prev) =>
      prev.map((t) => {
        t.id == taskId ? (t.status = statusId) : null
        return t
      })
    )

    const { data, ok } = await useAxios('/tasks/change-status', {
      method: 'patch',
      body: { taskId, statusId }
    })

    if (ok) {
      const el = document.getElementById(`task_${taskId}`)
      if (!el) return
      pulseAnim(el)
      getTasks()
    } else toast.error(data)

    return ok
  }

  const editStatusName = async (id: string, name: string) => {
    setTaskStatuses((prev) =>
      prev.map((ts) => {
        ts.id == id ? (ts.name = name) : null
        return ts
      })
    )

    const { data, ok } = await useAxios('/tasks/status-name', {
      method: 'patch',
      body: { id, name }
    })

    if (ok) {
      const el = document.getElementById(`status_${id}`)
      if (!el) return
      pulseAnim(el)
      await getTaskStatuses()
    } else toast.error(data)
  }

  const close = () => {
    setTaskStatus('')
    setPopupOpened(false)
  }

  return (
    <>
      <PageHeader title="Board" sub="Work the tasks" />

      <div className="mb-2 flex items-center justify-between ">
        <Search placeholder="Search tasks" />
      </div>

      <div
        className={`-m-1 flex max-w-full gap-5 overflow-x-auto p-1 pb-2${
          popupOpened ? ' w-[calc(100%-450px)]' : ''
        }`}
      >
        {taskStatuses?.map(({ name, id: statusId }) => {
          return (
            <div
              key={statusId}
              id={`dropzone_${statusId}`}
              data-dropzone={statusId}
              className="flex min-w-[280px] flex-col rounded-md border border-transparent bg-gray-900 p-1"
              onMouseEnter={(e) => {
                if (dragging) e.currentTarget?.classList.add('border-red-500')
              }}
              onMouseLeave={(e) => {
                if (dragging)
                  e.currentTarget?.classList.remove('border-red-500')
              }}
              onMouseUp={(e) => {
                e.currentTarget?.classList.remove('border-red-500')
              }}
            >
              <div className="rounded-[1px]" id={`status_${statusId}`}>
                <Editable
                  val={name}
                  live={true}
                  save={(name) => editStatusName(statusId, name)}
                />
              </div>
              <div className="grid flex-1 gap-1">
                {tasks?.map((task) => {
                  const { id, assignedTo, type, priority, title } =
                    task as TypeTask & { assignedTo?: User }

                  if (task.status == statusId)
                    return (
                      <div
                        key={id}
                        id={`task_${id}`}
                        className="h-[70px] w-[270px] rounded-sm text-left"
                        onMouseDown={(e) => {
                          const el = document.getElementById(
                            `task_${id}`
                          ) as HTMLElement
                          if (e.button != 0 || !el) return

                          setOffset({
                            x: el.offsetLeft - e.clientX,
                            y: el.offsetTop - e.clientY
                          })

                          setDragging(id)
                        }}
                      >
                        <button className="isolate z-30 h-[70px] w-[270px] rounded-sm bg-gray-800/75 p-2 text-left">
                          <h3 className="truncate text-sm">{title}</h3>
                          <div className="mt-2 flex items-center justify-between gap-1">
                            <div
                              data-tooltip={
                                type.toUpperCase()[0] + type.slice(1)
                              }
                            >
                              <TaskType type={type} />
                            </div>

                            <span className="flex-1 text-xs">{id}</span>
                            <Priority p={priority} />
                            {assignedTo && (
                              <div className="h-5 w-5 rounded-full">
                                <img
                                  draggable="false"
                                  data-tooltip={assignedTo?.userName}
                                  id="user_img"
                                  className="w-inherit h-inherit rounded-[inherit]"
                                  src={
                                    assignedTo?.hasProfileImage
                                      ? `/storage/users/${assignedTo?.id}.webp`
                                      : '/profile-picture.jpg'
                                  }
                                  alt="user image"
                                />
                              </div>
                            )}
                          </div>
                        </button>
                      </div>
                    )
                })}
              </div>
              <button
                className={`mt-1 flex w-full items-center gap-1 rounded-sm p-3 text-gray-400 ${
                  !dragging && 'hover:bg-zinc-800'
                }`}
                onClick={() => {
                  setPopupOpened(true)
                  setTaskStatus(name)
                }}
              >
                <Icon icon={Add} width="24px" /> Create Task
              </button>
            </div>
          )
        })}
      </div>

      {popupOpened && (
        <SideDialog title="New Task" closePopup={close}>
          <NewTask
            taskStatuses={taskStatuses}
            taskStatus={taskStatus}
            done={() => {
              close()
              getTasks()
            }}
            cancel={close}
          />
        </SideDialog>
      )}

      <Tooltip />
    </>
  )
}

export default Board
