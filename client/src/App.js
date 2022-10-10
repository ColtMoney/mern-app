import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'
import 'materialize-css'

function App() {
  const { token, userId, login, logout, ready } = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)

  if(!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuth
    }}>
      <div className="App">
        <BrowserRouter>
          {isAuth && <Navbar />}
          <div className="container">
            {routes}
          </div>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  )
}

export default App
