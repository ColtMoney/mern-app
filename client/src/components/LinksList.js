import { Link } from 'react-router-dom'

export function LinksList({ links }) {
  if(!links.length) {
    return <p>Links not found</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Original link</th>
          <th>Shorten link</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        { links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{ index + 1 }</td>
              <td>{ link.from }</td>
              <td>{ link.to }</td>
              <td><Link to={`/details/${link._id}`}>Open</Link></td>
            </tr>
          )
        }) }
      </tbody>
    </table>
  )
}
