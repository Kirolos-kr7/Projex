import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import './App.css'
import Layout from './Layout'
import Toastify from './components/Toast'
import useUser from './hooks/useUser'
import Account from './pages/Account'
import Auth from './pages/Auth'
import Sprint from './pages/Sprint'
import Board from './pages/Board'
import Code from './pages/Code'
import Project from './pages/Project'
import Settings from './pages/Settings'
import Team from './pages/Team'
import Err from './pages/Err'
import Notes from './pages/Notes'
import Logs from './pages/Logs'

export default function App() {
  const { user, pending } = useUser()

  const router = createBrowserRouter([
    {
      path: '/auth',
      element: user ? <Navigate to="/" /> : <Auth />,
      errorElement: <Err />
    },
    {
      path: '',
      element: user ? <Layout /> : <Navigate to="/auth" />,
      errorElement: <Err />,
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
          path: '/sprint',
          element: <Sprint />
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
          path: '/notes',
          element: <Notes />
        },
        {
          path: '/logs',
          element: <Logs />
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
      {!pending && <RouterProvider router={router} />}

      <Toastify></Toastify>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
