import { ReactElement, useEffect, useRef } from 'react'
import Close from '@iconify-icons/ic/close'
import { Icon } from '@iconify/react/dist/offline'
import { motion } from 'framer-motion'

const Popup = ({
  children,
  title,
  open = false,
  closePopup
}: {
  children: ReactElement
  title: string
  open: boolean
  closePopup: () => void
}) => {
  const dialog = useRef<any>()

  useEffect(() => {
    dialog?.current?.addEventListener('click', handleClick)
    return () => dialog?.current?.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    open ? dialog.current?.showModal() : dialog.current?.close()
  }, [open])

  const handleClick = (event: MouseEvent) => {
    if ((event.target as HTMLDialogElement)?.nodeName === 'DIALOG') {
      closePopup()
    }
  }

  return (
    <motion.dialog
      className="max-h-[80vh] rounded-md border border-gray-700 bg-gray-800 p-0 text-white"
      ref={dialog}
      initial={{ scale: 0.25, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h1 className="w-[75vw] text-xl font-medium sm:w-[300px] md:w-[30rem]">
            {title}
          </h1>
          <button className="rounded-md p-1" onClick={() => closePopup()}>
            <Icon icon={Close} width="24px" />
          </button>
        </div>

        <div className="mt-2">{children}</div>
      </div>
    </motion.dialog>
  )
}

export default Popup
