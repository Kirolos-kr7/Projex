import { useEffect, useState } from 'react'
import Task from '../components/Board/Task'
import {
  type Task as TaskType,
  type TaskStatus
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

const Board = () => {
  const [popupOpened, setPopupOpened] = useState(false)
  const [isDown, setIsDown] = useState(Number.NEGATIVE_INFINITY)
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([])
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [taskStatus, setTaskStatus] = useState('')
  const [dragging, setDragging] = useState('')

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

  const handleDrop = async (zoneId: string) => {
    const evtId = dragging
    setDragging('')
    if (!evtId) return

    const { data, ok } = await useAxios('/tasks/change-status', {
      method: 'patch',
      body: {
        taskId: evtId,
        statusId: zoneId
      }
    })

    if (ok) {
      toast.success(data)
      getTasks()
    } else toast.error(data)
  }

  // const handleParentDragging = (id: string | number, val = 'false') => {
  //   document.querySelector(`#dropzone_${id}`)?.setAttribute('draggable', val)
  // }

  // const handleParentPosition = (e: MouseEvent, id: number | string) => {
  //   if (isDown != id) return
  //   const el = document.querySelector(`#dropzone_${id}`) as HTMLElement

  //   const rect = el.getBoundingClientRect()
  //   const x = rect.width / 2

  //   el.style.position = 'absolute'
  //   el.style.zIndex = '3'
  //   el.style.top = `${e.clientY - 20}px`
  //   el.style.left = `${e.clientX - x}px`
  // }

  const editStatusName = async (id: string, name: string) => {
    const { data, ok } = await useAxios('/tasks/status-name', {
      method: 'patch',
      body: { id, name }
    })

    if (ok) {
      toast.success(data)
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
        className={`-m-1 flex max-w-full items-start gap-5 overflow-x-auto p-1 pb-2 ${
          popupOpened && 'w-[calc(100%-450px)]'
        }`}
      >
        {taskStatuses?.map(({ name, id }) => {
          return (
            <div className="min-w-[280px]" key={id}>
              <div
                className="min-w-[280px] rounded-md border border-transparent bg-gray-900 p-1"
                id={`dropzone_${id}`}
                onDragOver={(e) => {
                  e.preventDefault()
                  document
                    .querySelector(`#dropzone_${id}`)
                    ?.classList.add('!border-red-500')
                }}
                onDragLeave={() => {
                  document
                    .querySelector(`#dropzone_${id}`)
                    ?.classList.remove('!border-red-500')
                }}
                onDrop={() => {
                  document
                    .querySelector(`#dropzone_${id}`)
                    ?.classList.remove('!border-red-500')

                  handleDrop(id)
                }}
                // onMouseMove={(e) => handleParentPosition(e, id)}
              >
                <div
                  // onMouseDown={() => setIsDown(id)}
                  onMouseUp={() => {
                    const el = document.querySelector(
                      `.dropzone_${isDown}`
                    ) as HTMLElement
                    if (!el) return

                    el.style.zIndex = '1'
                    el.style.position = 'static'
                    setIsDown(Number.NEGATIVE_INFINITY)
                  }}
                >
                  <Editable
                    val={name}
                    live={true}
                    save={(name) => editStatusName(id, name)}
                  />
                </div>
                <div className="grid gap-1">
                  {tasks?.map((task, i) => {
                    if (task.status == id)
                      return (
                        <Task
                          key={i}
                          task={task}
                          dragStarted={(tId) => setDragging(tId)}
                        />
                      )
                  })}
                </div>
                <button
                  className="mt-1 flex w-full items-center gap-1 rounded-sm p-3 text-gray-400 hover:bg-zinc-800"
                  onClick={() => {
                    setPopupOpened(true)
                    setTaskStatus(name)
                  }}
                >
                  <Icon icon={Add} width="24px" /> Create Task
                </button>
              </div>
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
    </>
  )
}

export default Board
