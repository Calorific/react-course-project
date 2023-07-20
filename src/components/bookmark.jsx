import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({ isFavourite, onMarking }) => {
  return (
    <>
      <button onClick={onMarking}>
        <i className={'bi bi-bookmark' + (isFavourite ? '-heart-fill' : '')}></i>
      </button>

    </>
  )
}

Bookmark.propTypes = {
  isFavourite: PropTypes.bool.isRequired,
  onMarking: PropTypes.func.isRequired
}

export default Bookmark