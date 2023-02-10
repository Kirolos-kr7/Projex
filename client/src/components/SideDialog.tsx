import Close from '@iconify-icons/ic/close'
import { Icon } from '@iconify/react/dist/offline'
import { ReactElement } from 'react'

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
      <div className="fixed right-0 top-20 z-[21] flex h-[calc(100vh-5rem)] w-[450px] flex-col rounded-tl-lg border border-r-0 border-b-0 border-gray-700 bg-gray-900">
        <div className="flex items-center justify-between p-4">
          <h1 className="w-[95vw] text-xl font-medium sm:w-[300px] md:w-[40rem]">
            {title}
          </h1>
          <button className="rounded-md p-1" onClick={() => closePopup()}>
            <Icon icon={Close} width="24px"></Icon>
          </button>
        </div>
        {children}
      </div>
      <div
        className="fixed inset-0 z-20 bg-black/40"
        onClick={() => closePopup()}
      />
    </>
  )
}

export default SideDialog
