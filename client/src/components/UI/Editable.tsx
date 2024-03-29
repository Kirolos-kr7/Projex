import { useEffect, useRef, useState } from 'react'
import Check from '@iconify-icons/ic/check'
import Close from '@iconify-icons/ic/close'
import { Icon } from '@iconify/react/dist/offline'

const Editable = ({
  val,
  live,
  save
}: {
  val: string
  live: boolean
  save: (value: string) => void
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const applyRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    inputRef.current?.focus()

    addEventListener('mousedown', (e) => handleClickAway(e))
    return removeEventListener('mousedown', (e) => handleClickAway(e))
  }, [isEditing])

  const handleClickAway = (e: Event) => {
    {
      if (
        e.target !== inputRef.current &&
        e.target !== applyRef.current &&
        e.target !== closeRef.current
      )
        setIsEditing(false)
    }
  }

  return (
    <div className="relative mb-1">
      {!isEditing && (
        <h2
          className="truncate p-2 uppercase"
          onClick={() => live && setIsEditing(true)}
        >
          {val}
        </h2>
      )}
      {isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault()

            const result = inputRef.current?.value as string
            save(result)

            setIsEditing(false)
          }}
        >
          <input
            className="editable-input"
            type="text"
            ref={inputRef}
            defaultValue={val}
          />
          <div className="absolute right-0 mt-1.5 flex items-center gap-1.5">
            <button
              ref={applyRef}
              className="grid h-7 w-7 place-content-center rounded-sm bg-gray-700 shadow-md"
              type="submit"
            >
              <Icon icon={Check} width="20px" className="pointer-events-none" />
            </button>
            <button
              ref={closeRef}
              className="grid h-7 w-7 place-content-center rounded-sm bg-gray-700 shadow-md"
              onClick={() => setIsEditing(false)}
              type="button"
            >
              <Icon icon={Close} width="20px" className="pointer-events-none" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Editable
