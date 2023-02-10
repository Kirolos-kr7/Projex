import { Note as NoteType } from '../types'
import * as dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import { getUserICon } from '../utils/helper'
import Delete from '@iconify-icons/mdi/delete'
import Edit from '@iconify-icons/mdi/edit'
import { Icon } from '@iconify/react/dist/offline'
import { useContext } from 'react'
import { UserContext } from '../UserContext'

dayjs.extend(RelativeTime)

const Note = ({
  note,
  editNote,
  deleteNote
}: {
  note: NoteType
  editNote: (id: string) => void
  deleteNote: (id: string) => void
}) => {
  const { content, createdAt, author, authorId, id } = note
  const { user } = useContext(UserContext)

  return (
    <div className="bg-brand-800 border-brand-700 flex flex-col gap-1.5 rounded-md border p-3">
      <p className="flex-1 whitespace-pre-wrap">{content}</p>
      <span
        className="inline-block text-sm text-gray-400"
        title={new Date(createdAt).toUTCString()}
      >
        {dayjs(createdAt).fromNow()}
      </span>

      <div className="flex items-center justify-between">
        <span
          className="grid h-2.5 w-2.5 place-content-center rounded-full bg-red-600 p-3.5 text-xs"
          title={author.name}
        >
          {getUserICon(author.name)}
        </span>

        {authorId == user.id && (
          <div>
            <button className="icon-btn" onClick={() => deleteNote(id)}>
              <Icon icon={Delete} className="text-red-600" width="20" />
            </button>
            <button className="icon-btn" onClick={() => editNote(id)}>
              <Icon icon={Edit} className="text-green-600" width="20" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Note
