import Close from '@iconify-icons/ic/close'
import { Icon } from '@iconify/react/dist/offline'
import { ReactElement } from 'react'
import { CSSTransition } from 'react-transition-group'

const SideDialog = ({
  children,
  open,
  title,
  closePopup
}: {
  children: ReactElement
  open: boolean
  title: string
  closePopup: () => void
}) => {
  return (
    <>
      <CSSTransition
        in={open}
        classNames="fadeUp"
        timeout={300}
        onEnter={(el: HTMLElement) => el.classList.add('!flex')}
        unmountOnExit
      >
        <div className="fixed right-0 top-20 z-[21] hidden h-[calc(100vh-5rem)] w-[450px] flex-col rounded-tl-lg border border-b-0 border-r-0 border-gray-700 bg-gray-900 transition-all duration-300">
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
      </CSSTransition>
      <CSSTransition
        in={open}
        classNames="fade"
        timeout={300}
        onEnter={(el: HTMLElement) => el.classList.remove('hidden')}
        unmountOnExit
      >
        <div
          className="fixed inset-0 z-20 hidden  bg-black/40 transition-opacity duration-300"
          onClick={() => closePopup()}
        />
      </CSSTransition>
    </>
  )
}

export default SideDialog
