import { useRef, useState } from 'react'
import SearchIcon from '@iconify-icons/ic/search'
import Close from '@iconify-icons/ic/close'
import { Icon } from '@iconify/react/dist/offline'

const Search = ({
  placeholder = 'Search',
  update
}: {
  placeholder?: string
  update?: (val: string) => void
}) => {
  const [isEmpty, setIsEmpty] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative">
      <Icon
        icon={SearchIcon}
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

          if (update) update(el.value)
        }}
      />
      {!isEmpty && (
        <button
          className="absolute top-[7.5px] right-[7px] rounded-md"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = ''
              setIsEmpty(true)
            }
          }}
        >
          <Icon icon={Close} width="22px" />
        </button>
      )}
    </div>
  )
}

export default Search
