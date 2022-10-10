import { Routes, Route, Navigate } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailsPage } from './pages/DetailsPage'
import { AuthPage } from './pages/AuthPage'

export function useRoutes(isAuth) {
  if(isAuth) {
    return (
      <Routes>
        <Route path="/links" element={<LinksPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="*" element={<Navigate to="/create" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}