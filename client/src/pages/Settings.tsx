import { useState } from 'react'
import AddUser from '../components/AddUser'
import Popup from '../components/UI/Popup'
import { toast } from 'react-toastify'
import PageHeader from '../components/UI/PageHeader'
import { trpc } from '../utils/trpc'
import { handleError } from '../utils/helper'
import { AnimatePresence } from 'framer-motion'

const Settings = () => {
  const [popupOpened, setPopupOpened] = useState(false)

  return (
    <>
      <PageHeader title="Settings" sub="Twaek it the way you like" />

      <ul className="mt-10 grid  grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <li>
          <button
            className="btn w-full !px-5 !py-10"
            onClick={() => setPopupOpened(true)}
          >
            Create New User
          </button>
        </li>
      </ul>

      <AnimatePresence>
        {popupOpened && (
          <Popup
            title="Create New User"
            open={popupOpened}
            closePopup={() => setPopupOpened(false)}
          >
            <AddUser
              add={async (user) => {
                try {
                  await trpc.users.create.mutate(user)
                  toast.success('User created')
                  setPopupOpened(false)
                } catch (err) {
                  handleError(err)
                }
              }}
              cancel={() => setPopupOpened(false)}
            />
          </Popup>
        )}
      </AnimatePresence>
    </>
  )
}

export default Settings
