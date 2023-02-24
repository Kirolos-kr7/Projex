import { type Task, type User } from '../../../../node_modules/@prisma/client'
import Priority from './Priority'
import TaskType from './TaskType'

const Event = ({
  task,
  dragStarted
}: {
  task: Task & { assignedTo?: User }
  dragStarted: (id: string) => void
}) => {
  const { id, title, type, priority, assignedTo } = task

  return (
    <button
      className="rounded-sm bg-gray-800/75 p-2 text-left"
      draggable="true"
      onDragStart={(e) => {
        const el = e.target as HTMLElement
        el.classList.add('opacity-40')
        dragStarted(id)
      }}
      onDragEnd={(e) =>
        (e.target as HTMLElement).classList.remove('opacity-40')
      }
    >
      <h3 className="text-sm">{title}</h3>
      <div
        className="mt-2 flex items-center justify-between gap-1"
        title={type.toUpperCase()[0] + type.slice(1)}
      >
        <TaskType type={type} />

        <span className="flex-1 text-xs">{id}</span>
        <Priority p={priority} />
        <div className="h-5 w-5 rounded-full">
          <img
            title={assignedTo?.userName}
            id="user_img"
            className="w-inherit h-inherit rounded-[inherit]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIlzGp1laQheiAAjrbJJ3pasHLjMBnIUEZg&usqp=CAU"
            alt="user image"
          />
        </div>
      </div>
    </button>
  )
}

export default Event
