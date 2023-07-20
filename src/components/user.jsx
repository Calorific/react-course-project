import React from 'react'
import Quality from './quality'
import Bookmark from './bookmark'
import PropTypes from 'prop-types'

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
        <td>{<Bookmark isFavourite={user.bookmark} onMarking={() => onMarking(user._id)} />}</td>
        <td><button className="btn btn-danger" onClick={() => onDelete(user._id)}>Удалить</button></td>
      </tr>
    </>
  )
}

User.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profession: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
    qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
  onMarking: PropTypes.func.isRequired,
}

export default User