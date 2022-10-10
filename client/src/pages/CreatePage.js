import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook.js'
import { AuthContext } from '../context/AuthContext'

export function CreatePage() {
  const navigate = useNavigate()
  const [link, setLink] = useState('')
  const { request } = useHttp()
  const auth = useContext(AuthContext)

  const pressHandler = async (e) => {
    if(e.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        })
        navigate(`/details/${data.link._id}`)
      } catch (e) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            placeholder="Link"
            type="text"
            className="validate"
            name="link"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyDown={pressHandler}
          />
        </div>
      </div>
    </div>
  )
}
