import { useRef, useState } from 'react'
import Search from '@iconify-icons/ic/search'
import Close from '@iconify-icons/ic/close'
import { Icon } from '@iconify/react/dist/offline'

const Editable = ({ placeholder = 'Search' }: { placeholder?: string }) => {
  const [isEmpty, setIsEmpty] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative">
      <Icon
        icon={Search}
        width="22px"
        className="absolute top-[7.5px] left-[7px]"
      />
      <input
        ref={inputRef}
        type="text"
        className="w-72 rounded-md px-9 text-sm"
        placeholder={placeholder}
        onInput={(e) => {
          const el = e.target as HTMLInputElement
          if (el.value == '') setIsEmpty(true)
          else setIsEmpty(false)
        }}
      />
      {!isEmpty && (
        <button
          className="absolute top-[7.5px] right-[7px]"
          onClick={() => {
            if (inputRef.current) inputRef.current.value = ''
          }}
        >
          <Icon icon={Close} width="22px" />
        </button>
      )}
    </div>
  )
}

export default Editable
