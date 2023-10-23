import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import './App.css'
import Menu from './components/Menu'
import Articles from './components/Articles';
import SelectedArticle from './components/SelectedArticle';

function App() {
  return (
    <main>
    <h1>NC News</h1>
    <Routes>
      <Route path="/" element={<Menu />}></Route>
      <Route path="/articles" element={<Articles />}></Route>
      <Route path="/articles/:article_id" element={<SelectedArticle/>} />
    </Routes>
    </main>
  )
}

export default App
