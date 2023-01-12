import { useState } from 'react'
import AddUser from '../components/AddUser'
import Popup from '../components/UI/Popup'
import useAxios from '../hooks/useAxios'
import { toast } from 'react-toastify'

const Settings = () => {
  const [popupOpened, setPopupOpened] = useState(false)

  return (
    <div>
      <h1 className="page-title">Settings</h1>

      <ul className="mt-10 grid grid-cols-5 gap-5">
        <li>
          <button
            className="btn w-full !px-5 !py-10"
            onClick={() => setPopupOpened(true)}
          >
            Create New User
          </button>
        </li>
      </ul>

      {popupOpened && (
        <div>
          <Popup
            title="Create New User"
            closePopup={() => setPopupOpened(false)}
          >
            <AddUser
              add={async (user) => {
                const { ok, data } = await useAxios({
                  path: '/user/add',
                  body: user,
                  method: 'post'
                })

                if (ok) {
                  toast.success(data.message)
                  setPopupOpened(false)
                  return
                }

                if (data?.name == 'ZodError')
                  toast.error(data.issues[0].message)
                else toast.error(data.message)
              }}
              cancel={() => setPopupOpened(false)}
            ></AddUser>
          </Popup>
        </div>
      )}
    </div>
  )
}

export default Settings
