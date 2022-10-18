import Bug from '@iconify-icons/ic/twotone-bug-report'
import Clean from '@iconify-icons/ic/twotone-cleaning-services'
import Feature from '@iconify-icons/ic/twotone-auto-awesome'
import { Icon } from '@iconify/react/dist/offline'
import { TaskType } from '../../types'

const Event = ({
  evt
}: {
  evt: { title: string; status: number; type: TaskType; id: string }
}) => {
  return (
    <div
      className="opa cursor-grab rounded-sm bg-gray-800/75 p-2"
      draggable="true"
      onDragStart={(e) => {
        const el = e.target as HTMLElement
        el.classList.add('opacity-40')
        localStorage.setItem('dragging', evt.id)
      }}
      onDragEnd={(e) =>
        (e.target as HTMLElement).classList.remove('opacity-40')
      }
    >
      <h3 className="text-sm">{evt.title}</h3>
      <div className="mt-1 flex items-center justify-between gap-1">
        {evt.type === 'bugfix' && (
          <Icon
            icon={Bug}
            width="20px"
            className="rounded-md bg-red-800 p-0.5"
          />
        )}
        {evt.type === 'refactor' && (
          <Icon
            icon={Clean}
            width="20px"
            className="rounded-md bg-green-800 p-0.5"
          />
        )}
        {evt.type === 'feature' && (
          <Icon
            icon={Feature}
            width="20px"
            className="rounded-md bg-indigo-800 p-0.5"
          />
        )}

        <span className="flex-1 text-xs">{evt.id}</span>
        <div className="h-5 w-5 rounded-full">
          <img
            id="user_img"
            className="w-inherit h-inherit rounded-[inherit]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIlzGp1laQheiAAjrbJJ3pasHLjMBnIUEZg&usqp=CAU"
            alt="user image"
          />
        </div>
      </div>
    </div>
  )
}

export default Event
