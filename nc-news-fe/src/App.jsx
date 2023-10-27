import { useContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import {Link} from 'react-router-dom'

import './App.css'
import Menu from './components/Menu'
import Articles from './components/Articles';
import SelectedArticle from './components/SelectedArticle';
import LoginPage from './components/LoginPage';
import { UserContext } from './contexts/UserContext';

function App() {
  const { user } = useContext(UserContext)
  return (
    <main>
      {user ? (
        <Link to="/menu">
          <h1 className='header'>NC News</h1>
        </Link>
      ) : (
        <Link to="/">
          <h1 className='header'>NC News</h1>
        </Link>
      )}
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/menu" element={<Menu />}></Route>
      <Route path="/articles" element={<Articles />}></Route>
      <Route path="/articles/:article_id" element={<SelectedArticle/>} />
    </Routes>
    </main>
  )
}

export default App
