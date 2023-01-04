import { useState } from 'react'
import AddUser from '../components/AddUser'
import Popup from '../components/UI/Popup'

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
              add={(user) => {
                // Logic For Adding User to db here
                user
                // setMembers((curr) => {
                //   curr.push(user)
                //   return curr
                // })
                setPopupOpened(false)
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
