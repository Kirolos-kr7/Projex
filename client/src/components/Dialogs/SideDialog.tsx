import Close from '@iconify-icons/ic/close'
import { Icon } from '@iconify/react/dist/offline'
import { ReactElement } from 'react'
import { motion } from 'framer-motion'

const SideDialog = ({
  children,
  title,
  closePopup
}: {
  children: ReactElement
  title: string
  closePopup: () => void
}) => {
  return (
    <>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        className="fixed bottom-0 right-0 top-20 z-[21] h-[calc(100vh-5rem)] w-[450px] flex-col rounded-tl-lg border border-b-0 border-r-0 border-gray-700 bg-gray-900"
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="w-[95vw] text-xl font-medium sm:w-[300px] md:w-[40rem]">
            {title}
          </h1>
          <button className="rounded-md p-1" onClick={() => closePopup()}>
            <Icon icon={Close} width="24px"></Icon>
          </button>
        </div>
        {children}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-20 bg-[#00000050] backdrop-blur-[1px] transition-opacity duration-300"
        onClick={() => closePopup()}
      />
    </>
  )
}

export default SideDialog
