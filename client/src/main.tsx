import ReactDOM from 'react-dom/client'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import {
  Navigate,
  redirect,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import useAxios from './hooks/useAxios'
import { UserContext } from './UserContext'

import Project from './pages/Project'
import Layout from './Layout'
import Account from './pages/Account'
import Board from './pages/Board'
import Code from './pages/Code'
import Settings from './pages/Settings'
import Auth from './pages/Auth'
import Team from './pages/Team'
import Roles from './pages/Roles'
import './App.css'

export default function App() {
  const [isPending, setIsPending] = useState(true)
  const [user, setUser] = useState<any>()

  useEffect(() => {
    const auth = async () => {
      const { ok, data } = await useAxios({ path: '/auth/me' })
      setIsPending(false)

      if (data.token) {
        const decoded = jwt_decode(data.token)
        setUser(decoded)
      }

      if (ok) redirect('/')
      else redirect('/auth')
    }
    auth()
  }, [])

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
    <UserContext.Provider value={{ user, setUser }}>
      {!isPending && <RouterProvider router={router} />}
    </UserContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
