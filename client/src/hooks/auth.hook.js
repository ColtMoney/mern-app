import { useState, useCallback, useEffect } from 'react'

const USER_DATA = 'userData'

export function useAuth() {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [ready, setReady] = useState(false)

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)

    localStorage.setItem(USER_DATA, JSON.stringify({token: jwtToken, userId: id}))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(USER_DATA)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(USER_DATA))

    if (data && data.token) {
      login(data.token, data.userId)
    }
    setReady(true)
  }, [login])

  return {
    token,
    userId,
    login,
    logout,
    ready
  }
}