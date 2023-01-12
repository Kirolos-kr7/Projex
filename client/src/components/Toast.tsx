import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'

const Toastify = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        theme="dark"
      />
    </>
  )
}

export default Toastify
