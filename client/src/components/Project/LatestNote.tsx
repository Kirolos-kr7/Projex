import { useEffect, useState } from 'react'
import { trpc } from '../../utils/trpc'
import { NoteWithUser } from '../../types'
import dayjs from 'dayjs'

const LatestNote = () => {
  const [note, setNote] = useState<NoteWithUser>()
  const [isLoading, setIsLoading] = useState(true)

  const getBoardStatus = async () => {
    const { note: data } = await trpc.notes.getLatest.query()
    setNote(data as any)
    setIsLoading(false)
  }

  useEffect(() => {
    getBoardStatus()
  }, [])

  const getDay = dayjs(note?.createdAt)

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <h2 className="mb-3 text-xl font-semibold">Latest Note</h2>
        {!isLoading && note && (
          <p className="min-h-[100px] text-gray-300">{note?.content}</p>
        )}
      </div>

      {!isLoading && note && (
        <div>
          <div className="mt-2 flex items-center gap-3">
            <img
              className="h-9 w-9 rounded-full"
              src={
                note?.author?.hasProfileImage
                  ? `/storage/users/${note.author.id}.webp`
                  : '/profile-picture.jpg'
              }
              alt="User Profile Image"
            />
            <span>{note?.author?.userName}</span>
          </div>
          <span className="mt-2 block text-sm text-gray-400">
            {getDay.format('dddd, MMMM D, YYYY h:mm A')} [{getDay.fromNow()}]
          </span>
        </div>
      )}

      {!isLoading && !note && (
        <p className="text-gray-300">No notes Available</p>
      )}
    </div>
  )
}

export default LatestNote
