import { CSSTransition } from 'react-transition-group'

interface BoardMenu {
  open: boolean
  cords: { x: number; y: number }
  edit: () => void
  delete: () => void
}

const BoardMenu = ({ open, cords, edit, delete: del }: BoardMenu) => {
  return (
    <CSSTransition
      in={open}
      onEnter={(el: HTMLElement) => el.classList.remove('hidden')}
      classNames="fade"
      timeout={300}
      unmountOnExit
    >
      <ul
        style={{
          left: cords.x - 72,
          top: cords.y
        }}
        className="absolute hidden w-52 overflow-hidden rounded-md border border-gray-700 bg-gray-800 text-sm shadow-lg transition-opacity duration-300 [&>li>button:hover]:bg-red-700 [&>li>button]:w-full [&>li>button]:px-2 [&>li>button]:py-1.5 [&>li>button]:text-start [&>li>button]:transition-colors"
      >
        <li>
          <button onClick={edit}>Edit task</button>
        </li>
        <li>
          <button onClick={del}>Delete task</button>
        </li>
      </ul>
    </CSSTransition>
  )
}

export default BoardMenu
