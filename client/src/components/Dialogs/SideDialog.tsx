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
        className="fixed bottom-0 top-20 z-[21] flex h-[calc(100vh-5rem)] w-full !-translate-x-5 flex-col rounded-t-lg border border-gray-700 bg-gray-900 sm:right-0 sm:w-[450px] sm:!translate-x-0 sm:rounded-tr-none sm:border-b-0 sm:border-r-0"
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
