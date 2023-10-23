import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import './App.css'
import Menu from './components/Menu'
import Articles from './components/Articles';

function App() {
  return (
    <main>
    <h1>NC News</h1>
    <Routes>
      <Route path="/" element={<Menu />}></Route>
      <Route path="/articles" element={<Articles />}></Route>
    </Routes>
    </main>
  )
}

export default App
