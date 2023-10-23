import React from 'react'

function Menu() {
  return (
    <section>
        <h3>Welcome to NC News</h3>
        <button>View Articles</button>
        <button>Post New Article</button>
        <Link to="/articles"><button>Login</button></Link>
        <button>Logout</button>
    </section>
  )
}

export default Menu