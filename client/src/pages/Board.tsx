import { useState } from 'react'
import Event from '../components/Board/Event'

const Board = () => {
  const [states] = useState([
    { name: 'TO DO', id: 1 },
    { name: 'IN PROGRESS', id: 2 },
    { name: 'IN REVIEW', id: 3 },
    { name: 'DONE', id: 4 }
  ])
  const [events] = useState([
    {
      title: 'Todo 1',
      status: 1
    },
    {
      title: 'In Progress 1',
      status: 2
    },
    {
      title: 'In Review',
      status: 3
    },
    {
      title: 'Done',
      status: 4
    },
    {
      title: 'In Progress 2',
      status: 2
    },
    {
      title: 'Todo 2 ',
      status: 1
    }
  ])

  const handleDrop = (evt) => {
    console.log('xxxxxxxxxxxxx')
    console.log(evt)
  }

  return (
    <div>
      <h1 className="page-title">Board</h1>

      <div className="[&>*]:min-w-[280px] scroller [&>*]:p-1 [&>*]:h-[calc(100vh-120px)] [&>*]:rounded-md [&>*]:bg-gray-900 [&>*]:border [&>*]:border-transparent -m-1 mt-8 flex max-w-full items-center gap-5 overflow-x-auto p-1 pb-2">
        {states.map(({ name, id }) => {
          return (
            <div
              key={id}
              onDragEnter={(e) => {
                const el = e.target as HTMLElement
                el.classList.add('!border-red-500')
              }}
              onDragLeave={(e) => {
                const el = e.target as HTMLElement
                el.classList.remove('!border-red-500')
              }}
              onDrop={(e) => handleDrop(e)}
            >
              <h2 className="p-2">{name}</h2>
              <div className="grid gap-1">
                {events.map((events, i) => {
                  if (events.status == id) return <Event key={i} evt={events} />
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Board
