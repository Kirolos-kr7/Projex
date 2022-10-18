import { useState } from 'react'
import Event from '../components/Board/Event'

const Board = () => {
  const [states] = useState([
    { name: 'TO DO', id: 1 },
    { name: 'IN PROGRESS', id: 2 },
    { name: 'IN REVIEW', id: 3 },
    { name: 'DONE', id: 4 }
  ])

  const [events, setEvents] = useState([
    {
      title: 'Todo 1',
      status: 1,
      type: 'bugfix',
      id: 'PMS-1'
    },
    {
      title: 'In Progress 1',
      status: 2,
      type: 'feature',
      id: 'PMS-2'
    },
    {
      title: 'In Review',
      status: 3,
      type: 'feature',
      id: 'PMS-6'
    },
    {
      title: 'Done',
      status: 4,
      type: 'refactor',
      id: 'PMS-5'
    },
    {
      title: 'In Progress 2',
      status: 2,
      type: 'refactor',
      id: 'PMS-4'
    },
    {
      title: 'Todo 2 ',
      status: 1,
      type: 'bugfix',
      id: 'PMS-3'
    }
  ])

  const handleDrop = (zoneId: number) => {
    const evtId = localStorage.getItem('dragging')
    localStorage.removeItem('dragging')
    if (!evtId) return

    setEvents(() =>
      events
        .map((evt) => {
          if (evt.id === evtId) evt.status = zoneId
          return evt
        })
        .sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
    )
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
              onDragOver={(e) => {
                e.preventDefault()
              }}
              onDrop={(e) => {
                const el = e.target as HTMLElement
                el.classList.remove('!border-red-500')

                handleDrop(id)
              }}
            >
              <h2 className="p-2">{name}</h2>
              <div className="grid gap-1">
                {events.map((event, i) => {
                  if (event.status == id) return <Event key={i} evt={event} />
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
