import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { UserContext } from './UserContext'

import './App.css'
import Layout from './Layout'
import Toastify from './components/Toast'
import useUser from './hooks/useUser'
import Account from './pages/Account'
import Auth from './pages/Auth'
import Board from './pages/Board'
import Code from './pages/Code'
import Project from './pages/Project'
import Roles from './pages/Roles'
import Settings from './pages/Settings'
import Team from './pages/Team'

export default function App() {
  const { user, setUser, pending } = useUser()

  const router = createBrowserRouter([
    {
      path: '/auth',
      element: user ? <Navigate to="/" /> : <Auth />
    },
    {
      path: '',
      element: user ? <Layout /> : <Navigate to="/auth" />,
      children: [
        {
          path: '/',
          element: <Project />
        },
        {
          path: '/account',
          element: <Account />
        },
        {
          path: '/board',
          element: <Board />
        },
        {
          path: '/code',
          element: <Code />
        },
        {
          path: '/team',
          element: <Team />
        },
        {
          path: '/roles',
          element: <Roles />
        },
        {
          path: '/settings',
          element: <Settings />
        }
      ]
    }
  ])

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        {!pending && <RouterProvider router={router} />}
      </UserContext.Provider>

      <Toastify></Toastify>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
