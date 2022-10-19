import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Project from './pages/Project'
import Board from './pages/Board'
import Code from './pages/Code'
import './App.css'
import Team from './pages/Team'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Project />}></Route>
          <Route path="/board" element={<Board />}></Route>
          <Route path="/code" element={<Code />}></Route>
          <Route path="/team" element={<Team />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
