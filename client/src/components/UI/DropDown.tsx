import Chevron from '@iconify-icons/ic/keyboard-arrow-down'
import { Icon } from '@iconify/react/dist/offline'
import { useEffect, useRef, useState } from 'react'
import { DropDown as DropDownType } from '../../types'

const DropDown = (props: DropDownType) => {
  const { options, selected, keyValue, keyName, fn, className, disabled } =
    props

  const [isOpened, setIsOpened] = useState(false)
  const btn = useRef(null)
  const menu = useRef(null)
  const filteredVals = () =>
    options.filter((v) => (keyValue ? v[keyValue] : v) != selected)
  useEffect(() => {
    if (isOpened) document.addEventListener('mousedown', handleClickAway)
    return () => document.removeEventListener('mousedown', handleClickAway)
  }, [isOpened])

  const handleClickAway = (e?: Event) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Object is possibly 'null'.
    if (!menu.current.contains?.(e?.target) && btn.current != e?.target) {
      setIsOpened(false)
      document.removeEventListener('mousedown', handleClickAway)
    }
  }

  return (
    <div className="relative text-sm">
      <button
        type="button"
        ref={btn}
        className={
          'mb-1.5 flex items-center justify-between gap-2 rounded-md bg-gray-800 px-3 py-2 capitalize transition-colors hover:bg-gray-700/60 ' +
          className
        }
        onClick={() => {
          if (disabled || options.length == 0) return
          isOpened ? setIsOpened(false) : setIsOpened(true)
        }}
      >
        {selected}{' '}
        <Icon
          icon={Chevron}
          width="20px"
          className={disabled || options.length == 0 ? 'text-gray-500' : ''}
        />
      </button>

      {options.length > 0 && (
        <ul
          ref={menu}
          className={`absolute z-[3] min-w-[180px] overflow-hidden rounded-md bg-gray-800 capitalize shadow-lg ring-1 ring-gray-700 ${
            !isOpened && 'hidden'
          }`}
        >
          {filteredVals().map((v) => {
            return (
              <li key={keyValue ? v[keyValue] : v} className="group">
                <button
                  type="button"
                  className="block w-full bg-gray-800 px-2 py-1.5 text-left capitalize ring-inset transition-colors hover:bg-gray-700 focus-visible:ring-1 group-first-of-type:rounded-t-md group-last-of-type:rounded-b-md"
                  onClick={() => {
                    fn?.(v)
                    setIsOpened(false)
                  }}
                >
                  {keyName ? v[keyName] : keyValue ? v[keyValue] : v}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default DropDown
