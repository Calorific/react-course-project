import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getCurrentUserData } from '../../store/users'

const Bookmark = ({ onMarking, userId }) => {
  const currentUser = useSelector(getCurrentUserData())
  const isFavourite = currentUser.favourites.includes(userId)
  return (
    <>
      <button onClick={onMarking}>
        <i className={'bi bi-bookmark' + (isFavourite ? '-heart-fill' : '')}></i>
      </button>

    </>
  )
}

Bookmark.propTypes = {
  userId: PropTypes.string.isRequired,
  onMarking: PropTypes.func
}

export default Bookmark