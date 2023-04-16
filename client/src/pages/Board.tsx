import { MouseEvent as MouseEventX, useEffect, useMemo, useState } from 'react'
import { SelectUserBoard } from '../types'
import { type Task as TypeTask, type TaskStatus, type User } from '../types'
import Add from '@iconify-icons/ic/add'
import { Icon } from '@iconify/react/dist/offline'
import Editable from '../components/UI/Editable'
import Search from '../components/UI/Search'
import SideDialog from '../components/Dialogs/SideDialog'
import TaskDialog from '../components/Dialogs/TaskDialog'
import PageHeader from '../components/UI/PageHeader'
import Priority from '../components/Board/Priority'
import TaskType from '../components/Board/TaskType'
import { handleError, pulseAnim } from '../utils/helper'
import Tooltip from '../components/UI/Tooltip'
import { trpc } from '../utils/trpc'
import BoardMenu from '../components/Board/BoardMenu'
import ConfirmationDialog from '../components/Dialogs/ConfirmationDialog'
import Popup from '../components/UI/Popup'
import SelectUsers from '../components/Board/SelectUsers'

interface TaskWithUser extends TypeTask {
  assignedTo: User
}

const Board = () => {
  const [searchValue, setSearchValue] = useState('')
  const [popupOpened, setPopupOpened] = useState(false)
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([])
  const [tasks, setTasks] = useState<TaskWithUser[]>([])
  const [taskStatus, setTaskStatus] = useState('')
  const [dragging, setDragging] = useState<number | null>()
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [ctxOpen, setCtxOpen] = useState(false)
  const [cords, setCords] = useState({ x: 0, y: 0 })
  const [selectedTask, setSelectedTask] = useState<TaskWithUser | undefined>(
    undefined
  )
  const [deletePopup, setDeletePopup] = useState(false)

  const getTasks = async () => {
    const data = await trpc.tasks.getAll.query()

    setTasks(data as any)
  }

  const getTaskStatuses = async () => {
    const data = await trpc.tasks.getTaskStatuses.query()
    setTaskStatuses(data as any)
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

  const taskList = useMemo(() => {
    let val = tasks

    if (searchValue && searchValue !== '') {
      val = val.filter(({ title, id, priority, status, type }) => {
        const sv = searchValue.toLowerCase()

        return (
          title.toLowerCase().includes(sv) ||
          `PMS-${id}`.toLowerCase().includes(sv) ||
          String(id).includes(sv) ||
          priority.toLowerCase().includes(sv) ||
          status.toLowerCase().includes(sv) ||
          type.toLowerCase().includes(sv)
        )
      })
    }

    if (selectedUsers.length > 0)
      val = val.filter(({ assignedToId }) => {
        if (!assignedToId) assignedToId = 'unassigned'
        return selectedUsers.includes(assignedToId)
      })

    return val
  }, [searchValue, tasks, selectedUsers])

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

    if (!dragging) return
    updateTaskStatus(dropZoneId, dragging)

    setDragging(null)
    setOffset({ x: 0, y: 0 })
  }

  const updateTaskStatus = async (
    statusId: string | undefined,
    taskId: number
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

    try {
      await trpc.tasks.changeTaskStatus.mutate({ taskId, statusId })
      const el = document.getElementById(`task_${taskId}`)
      if (!el) return
      pulseAnim(el)
      getTasks()
    } catch (err) {
      handleError(err)
    }
  }

  const editStatusName = async (id: string, name: string) => {
    setTaskStatuses((prev) =>
      prev.map((ts) => {
        ts.id == id ? (ts.name = name) : null
        return ts
      })
    )

    try {
      await trpc.tasks.changeStatusName.mutate({ id, name })
      const el = document.getElementById(`status_${id}`)
      if (!el) return
      pulseAnim(el)
      await getTaskStatuses()
    } catch (err) {
      handleError(err)
    }
  }

  const close = () => {
    setTaskStatus('')
    setPopupOpened(false)
    setSelectedTask(undefined)
  }

  const cordsReset = () => {
    setCtxOpen(false)
  }

  useEffect(() => {
    window.addEventListener('mouseup', cordsReset)
    return () => window.removeEventListener('mouseup', cordsReset)
  }, [])

  const handleContextMenu = (e: MouseEventX, id: number) => {
    e.preventDefault()
    const { pageX, pageY } = e

    const t = tasks.find(({ id: tId }) => tId == id)
    if (!t) return
    setSelectedTask(t)
    setCtxOpen(true)
    setCords({
      x: pageX,
      y: pageY
    })
  }

  const deleteTask = async () => {
    if (!selectedTask?.id) return console.error('Deletion requires an id')

    try {
      await trpc.tasks.delete.mutate({ id: selectedTask?.id })
      await getTasks()
    } catch (err) {
      handleError(err)
    }

    setDeletePopup(false)
  }

  const getUsersList = useMemo(() => {
    const ul: any = {}

    tasks.map(({ assignedTo: user }) => {
      if (!user) return

      const { id, userName, hasProfileImage } = user
      ul[id] = {
        id,
        userName,
        hasProfileImage,
        selected: selectedUsers.includes(id)
      }
    })

    const unassigned = 'unassigned'

    ul[unassigned] = {
      id: unassigned,
      userName: unassigned,
      hasProfileImage: false,
      selected: selectedUsers.includes(unassigned)
    }

    return Object.values(ul) as SelectUserBoard[]
  }, [tasks, selectedUsers])

  return (
    <>
      <PageHeader title="Board" sub="Work the tasks" />

      <div className="mb-2 flex items-center justify-between ">
        <Search
          placeholder="Search tasks"
          update={(val: string) => setSearchValue(val)}
        />
        <SelectUsers users={getUsersList} setSelected={setSelectedUsers} />
      </div>

      <div
        className={`-m-1 flex max-w-full gap-5 overflow-x-auto p-1 pb-2${
          popupOpened ? ' w-[calc(100%-450px)]' : ''
        }`}
      >
        {taskStatuses
          ?.sort(({ order: a }, { order: b }) => a - b)
          ?.map(({ name, id: statusId }) => {
            return (
              <div
                key={statusId}
                id={`dropzone_${statusId}`}
                data-dropzone={statusId}
                className="flex h-min min-w-[280px] flex-col rounded-md border border-transparent bg-gray-900 p-1"
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
                <div className="grid gap-1">
                  {taskList?.map((task) => {
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
                          onContextMenu={(e: MouseEventX) =>
                            handleContextMenu(e, id)
                          }
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

                              <span className="flex-1 text-xs">
                                {'PMS-' +
                                  new Intl.NumberFormat(undefined, {
                                    minimumIntegerDigits: 2
                                  }).format(id)}
                              </span>
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

      <SideDialog
        open={popupOpened}
        title={selectedTask ? 'Edit Task' : 'New Task'}
        closePopup={close}
      >
        <TaskDialog
          task={selectedTask}
          taskStatuses={taskStatuses}
          taskStatus={taskStatus}
          done={() => {
            close()
            getTasks()
          }}
          cancel={close}
        />
      </SideDialog>

      <BoardMenu
        open={ctxOpen}
        cords={cords}
        edit={() => setPopupOpened(true)}
        delete={() => setDeletePopup(true)}
      />

      <Popup
        title="Delete Task"
        open={deletePopup}
        closePopup={() => setDeletePopup(false)}
      >
        <ConfirmationDialog
          accept={deleteTask}
          cancel={() => setDeletePopup(false)}
        />
      </Popup>

      <Tooltip />
    </>
  )
}

export default Board
