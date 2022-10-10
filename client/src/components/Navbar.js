import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function Navbar() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const logoutHundler = (event) => {
    event.preventDefault()
    auth.logout()
    navigate('/')
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1">
        <div className="container">
          <span className="brand-logo">Short Link</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/create">Create</Link></li>
            <li><Link to="/links">Links</Link></li>
            <li><a href="/" onClick={logoutHundler}>Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}