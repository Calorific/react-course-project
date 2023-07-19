import React from 'react'

const Bookmark = ({ isFavorite, onMarking }) => {
  
  return (
    <>
      <button onClick={onMarking}>
        <i className={'bi bi-bookmark' + (isFavorite ? '-heart-fill' : '')}></i>
      </button>

    </>
  )
}

export default Bookmark