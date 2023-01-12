import { ReactElement } from 'react'
import Close from '@iconify-icons/ic/close'
import { Icon } from '@iconify/react/dist/offline'

const Popup = ({
  children,
  title,
  closePopup
}: {
  children: ReactElement
  title: string
  closePopup: () => void
}) => {
  return (
    <div className="fixed inset-0 grid place-content-center">
      <div
        className="absolute inset-0 z-[1] bg-black/30 backdrop-blur-[2px]"
        onClick={() => closePopup()}
      />

      <div className="relative z-10  max-h-[80vh] rounded-md border border-gray-700 bg-gray-800 p-3">
        <div className="flex items-center justify-between">
          <h1 className="w-[75vw] text-xl font-medium sm:w-[300px] md:w-[30rem]">
            {title}
          </h1>
          <button className="rounded-md p-1" onClick={() => closePopup()}>
            <Icon icon={Close} width="24px"></Icon>
          </button>
        </div>

        <div className="mt-2">{children}</div>
      </div>
    </div>
  )
}

export default Popup
