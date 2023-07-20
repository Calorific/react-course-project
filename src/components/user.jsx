import React from 'react'
import Quality from './quality'
import Bookmark from './bookmark'

const User = ({ user, onDelete, onMarking }) => {

  return (
    <>
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map(q => <Quality quality={q} key={q._id} />)}
        </td>
        <td>
          {user.profession.name}
        </td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <td>{<Bookmark isFavorite={user.bookmark} onMarking={() => onMarking(user._id)} />}</td>
        <td><button className="btn btn-danger" onClick={() => onDelete(user._id)}>Удалить</button></td>
      </tr>
    </>
  )
}

export default User