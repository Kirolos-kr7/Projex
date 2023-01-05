import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  redirect
} from 'react-router-dom'
import Layout from './Layout'
import Project from './pages/Project'
import Board from './pages/Board'
import Code from './pages/Code'
import Settings from './pages/Settings'
import Auth from './pages/Auth'
import './App.css'
import Team from './pages/Team'
import Roles from './pages/Roles'
import useAxios from './hooks/useAxios'
import { UserContext } from './UserContext'
import Account from './pages/Account'

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        {!isPending && (
          <Routes>
            <Route
              path="/auth"
              element={user ? <Navigate to="/" /> : <Auth />}
            ></Route>
            <Route
              path="/"
              element={user ? <Layout /> : <Navigate to="/auth" />}
            >
              <Route index element={<Project />}></Route>
              <Route path="/account" element={<Account />}></Route>
              <Route path="/board" element={<Board />}></Route>
              <Route path="/code" element={<Code />}></Route>
              <Route path="/team" element={<Team />}></Route>
              <Route path="/roles" element={<Roles />}></Route>
              <Route path="/settings" element={<Settings />}></Route>
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </UserContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
