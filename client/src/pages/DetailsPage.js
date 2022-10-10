import { useState, useContext, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook.js'
import { AuthContext } from '../context/AuthContext.js'
import { Loader } from '../components/Loader'
import { LinkCard } from '../components/LinkCard'


export function DetailsPage() {
  const [link, setLink] = useState(null)
  const { id } = useParams()
  const { request, loading } = useHttp()
  const { token } = useContext(AuthContext)

  const getLink = useCallback(async () => {
    const data = await request(`/api/link/${id}`, 'GET', null, {
      Authorization: `Bearer ${token}`
    })
    setLink(data)
  }, [token, id, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if(loading) {
    return <Loader />
  }

  return (
    <>
      { !loading && link && <LinkCard link={link} /> }
    </>
  )
}