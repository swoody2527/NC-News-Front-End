import { useState } from 'react'

import './App.css'
import Menu from './components/Menu'

function App() {
  return (
    <main>
    <h1>NC News</h1>
    <Routes>
      <Route path ="/"/>
      <Route path="/menu" element={<Menu />}></Route>
      <Route path="/articles" element={<Articles />}></Route>
    </Routes>
    <Menu/>
    </main>
  )
}

export default App
