import { useEffect, useRef, useState } from 'react'
import Check from '@iconify-icons/ic/check'
import Close from '@iconify-icons/ic/close'
import { Icon } from '@iconify/react/dist/offline'

const Editable = ({ val }: { val: string }) => {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [isEditing])

  return (
    <div className="relative mb-1">
      {!isEditing && (
        <h2 className="p-2 uppercase" onClick={() => setIsEditing(true)}>
          {val}
        </h2>
      )}
      {isEditing && (
        <>
          <input type="text" ref={inputRef} defaultValue={val} />
          <div className="absolute right-0 mt-1.5 flex items-center gap-1.5">
            <button className="grid h-7 w-7 place-content-center rounded-sm bg-gray-700 shadow-md">
              <Icon icon={Check} width="20px" />
            </button>
            <button
              className="grid h-7 w-7 place-content-center rounded-sm bg-gray-700 shadow-md"
              onClick={() => setIsEditing(false)}
            >
              <Icon icon={Close} width="20px" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Editable
