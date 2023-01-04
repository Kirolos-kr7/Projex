import { useState } from 'react'
import AddUser from '../components/AddUser'
import Popup from '../components/UI/Popup'

const Settings = () => {
  const [popupOpened, setPopupOpened] = useState(false)

  return (
    <div>
      <h1 className="page-title">Settings</h1>

      <ul className="settings-grid mt-10 grid grid-cols-4 gap-5">
        <li>
          <button onClick={() => setPopupOpened(true)}>Create New User</button>
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
