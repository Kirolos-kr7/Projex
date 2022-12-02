import { MouseEvent, useState } from 'react'
import Task from '../components/Board/Task'
import { Task as TaskType } from '../types'
import Add from '@iconify-icons/ic/add'
import { Icon } from '@iconify/react/dist/offline'
import Editable from '../components/UI/Editable'
import Search from '../components/UI/Search'
import SideDialog from '../components/SideDialog'
import NewTask from '../components/NewTask'

const Board = () => {
  const [popupOpened, setPopupOpened] = useState(false)
  const [isDown, setIsDown] = useState(Number.NEGATIVE_INFINITY)
  const [states] = useState([
    { name: 'To Do', id: 1 },
    { name: 'In Progress', id: 2 },
    { name: 'In Review', id: 3 },
    { name: 'Done', id: 4 }
  ])

  const [tasks, setTasks] = useState<TaskType[]>([
    {
      title: 'Todo 1',
      status: 1,
      type: 'bugfix',
      priority: 'low',
      id: 'PMS-1'
    },
    {
      title: 'In Progress 1',
      status: 2,
      type: 'feature',
      priority: 'critical',
      id: 'PMS-2'
    },
    {
      title: 'In Review',
      status: 3,
      type: 'feature',
      priority: 'lowest',
      id: 'PMS-6'
    },
    {
      title: 'Done',
      status: 4,
      type: 'refactor',
      priority: 'highest',
      id: 'PMS-5'
    },
    {
      title: 'In Progress 2',
      status: 2,
      type: 'refactor',
      priority: 'trivial',
      id: 'PMS-4'
    },
    {
      title: 'Todo 2 ',
      status: 1,
      type: 'bugfix',
      priority: 'medium',
      id: 'PMS-3'
    }
  ])
  const [newTask, setNewTask] = useState('')

  const handleDrop = (zoneId: number) => {
    const evtId = localStorage.getItem('dragging')
    localStorage.removeItem('dragging')
    if (!evtId) return

    setTasks(() =>
      tasks
        .map((task) => {
          if (task.id === evtId) task.status = zoneId
          return task
        })
        .sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
    )
  }

  // const handleParentDragging = (id: string | number, val = 'false') => {
  //   document.querySelector(`#dropzone_${id}`)?.setAttribute('draggable', val)
  // }

  const handleParentPosition = (e: MouseEvent, id: number | string) => {
    if (isDown != id) return
    const el = document.querySelector(`#dropzone_${id}`) as HTMLElement

    const rect = el.getBoundingClientRect()
    const x = rect.width / 2

    el.style.position = 'absolute'
    el.style.zIndex = '3'
    el.style.top = `${e.clientY - 20}px`
    el.style.left = `${e.clientX - x}px`
  }

  return (
    <div>
      <h1 className="page-title">Board</h1>

      <div className="mb-2 flex items-center justify-between ">
        <Search placeholder="Search tasks" />
      </div>

      <div
        className={`scroller -m-1 flex max-w-full items-start gap-5 overflow-x-auto p-1 pb-2 ${
          popupOpened && 'w-[calc(100%-450px)]'
        }`}
      >
        {states.map(({ name, id }) => {
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
                onMouseMove={(e) => handleParentPosition(e, id)}
              >
                <div
                  onMouseDown={() => setIsDown(id)}
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
                  <Editable val={name} live={false} />
                  {/* <span>{name}</span> */}
                </div>
                <div className="grid gap-1">
                  {tasks.map((task, i) => {
                    if (task.status == id) return <Task key={i} task={task} />
                  })}
                </div>
                <button
                  className="mt-1 flex w-full items-center gap-1 rounded-sm p-3 text-gray-400 hover:bg-zinc-800"
                  onClick={() => {
                    setPopupOpened(true)
                    setNewTask(name)
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
        <SideDialog title="New Task" closePopup={() => setPopupOpened(false)}>
          <NewTask task={newTask} tasks={tasks} />
        </SideDialog>
      )}
    </div>
  )
}

export default Board
