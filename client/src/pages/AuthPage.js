import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export function AuthPage() {
  const { request, error, loading, clearError } = useHttp()
  const message = useMessage()
  const auth = useContext(AuthContext)
  const [form, setForm] = useState({ email: '', password: '' })

  const changeHundler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const registerHundler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {}
  }

  const loginHundler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Short link</h1>
        <div className="card">
          <div className="card-content white-text">
            <span className="card-title black-text">Authentication</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Email"
                  type="text"
                  className="validate"
                  name="email"
                  value={form.email}
                  onChange={changeHundler}
                />
              </div>
              <div className="input-field">
                <input
                  placeholder="Password"
                  type="password"
                  className="validate"
                  name="password"
                  value={form.password}
                  onChange={changeHundler}
                />
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHundler}
            >
              Sign in
            </button>
            <button
              className="btn grey lighten-4 black-text"
              disabled={loading}
              onClick={registerHundler}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
