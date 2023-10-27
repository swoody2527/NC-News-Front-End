import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Menu.css'
import { UserContext } from '../contexts/UserContext'

function Menu() {
  const navigate = useNavigate()
  const {logout, user} = useContext(UserContext)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <section>
        <h3>Welcome to NC News</h3>
        <h4>Logged in as: {user.username}</h4>
        <Link to="/articles"><button>View Articles</button></Link>
        <button>Post New Article</button>
        <button onClick={handleLogout}>Logout</button>
    </section>
  )
}

export default Menu