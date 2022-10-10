import { useState, useContext, useCallback, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook.js'
import { AuthContext } from '../context/AuthContext.js'
import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList'

export function LinksPage() {
  const [links, setLinks] = useState([])
  const { request, loading } = useHttp()
  const { token } = useContext(AuthContext)

  const getLinks = useCallback(async () => {
    const data = await request('/api/links/', 'GET', null, {
      Authorization: `Bearer ${token}`
    })
    setLinks(data)
  }, [token, request])

  useEffect(() => {
    getLinks()
  }, [getLinks])

  if(loading) {
    return <Loader />
  }

  return (
    <>
      { !loading && <LinksList links={links} /> }
    </>
  )
}