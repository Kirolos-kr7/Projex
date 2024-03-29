import type { NoteWithUser } from '../types'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import { getUserICon } from '../utils/helper'
import Delete from '@iconify-icons/mdi/delete'
import Edit from '@iconify-icons/mdi/edit'
import { Icon } from '@iconify/react/dist/offline'
import userStore from '../stores/userStore'
import { motion } from 'framer-motion'

dayjs.extend(RelativeTime)

const Note = ({
  note,
  i,
  editNote,
  deleteNote
}: {
  note: NoteWithUser
  i: number
  editNote: (id: number) => void
  deleteNote: (id: number) => void
}) => {
  const { content, createdAt, author, authorId, id } = note
  const { user } = userStore()

  const NoteVariant = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: 0.1 * i
      }
    })
  }

  return (
    <motion.div
      variants={NoteVariant}
      custom={i}
      initial="hidden"
      animate="visible"
      className="bg-brand-800 border-brand-700 flex flex-col gap-1.5 rounded-md border p-3"
    >
      <p className="flex-1 whitespace-pre-wrap break-all">{content}</p>
      <span
        className="inline-block text-sm text-gray-400"
        title={new Date(createdAt).toUTCString()}
      >
        {dayjs(createdAt).fromNow()}
      </span>

      <div className="flex items-center justify-between">
        <span
          className="grid h-2.5 w-2.5 place-content-center rounded-full bg-red-600 p-3.5 text-xs"
          title={author.userName}
        >
          {getUserICon(author.userName)}
        </span>

        {authorId == user?.id && (
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
    </motion.div>
  )
}

export default Note
