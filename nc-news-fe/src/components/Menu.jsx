import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {
  return (
    <section>
        <h3>Welcome to NC News</h3>
        <Link to="/articles"><button>View Articles</button></Link>
        <button>Post New Article</button>
        <button>Login</button>
        <button>Logout</button>
    </section>
  )
}

export default Menu