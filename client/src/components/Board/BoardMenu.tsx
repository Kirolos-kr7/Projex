import { AnimatePresence, motion } from 'framer-motion'

interface BoardMenu {
  open: boolean
  cords: { x: number; y: number }
  edit: () => void
  delete: () => void
}

const MenuVariant = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
}

const BoardMenu = ({ open, cords, edit, delete: del }: BoardMenu) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.ul
          variants={MenuVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{
            left: cords.x - 72,
            top: cords.y
          }}
          className="absolute w-52 overflow-hidden rounded-md border border-gray-700 bg-gray-800 text-sm shadow-lg transition-opacity duration-300 [&>li>button:hover]:bg-red-700 [&>li>button]:w-full [&>li>button]:px-2 [&>li>button]:py-1.5 [&>li>button]:text-start [&>li>button]:transition-colors"
        >
          <li>
            <button onClick={edit}>Edit task</button>
          </li>
          <li>
            <button onClick={del}>Delete task</button>
          </li>
        </motion.ul>
      )}
    </AnimatePresence>
  )
}

export default BoardMenu
