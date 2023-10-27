import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

    const navigate = useNavigate()

    const [username, setUserName] = useState("")
    const [validUsers, setValidUsers] = useState([])
    const { login } = useContext(UserContext)
    const [isInvalidUsername, setIsInvalidUsername] = useState(false)

    useEffect(() => {
        axios.get("https://be-nc-news-sopv.onrender.com/api/users")
        .then((response) => {
            setValidUsers(response.data.allUsers.map((user) => user.username))
        })
        .catch((err) => console.log(err))
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        if (!validUsers.includes(username)) {
            setIsInvalidUsername(true)
        } else {
            setIsInvalidUsername(false)
            login(username)
            navigate("/menu")
        }

    }
    return (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          {isInvalidUsername ? <p>Invalid Username</p> : null }
        </div>
      );
    };

export default LoginPage