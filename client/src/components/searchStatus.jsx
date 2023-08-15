import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ length }) => {
  const renderPhrase = n => {
    if (!n)
      return <span className='badge bg-danger'>Никто с тобой не тусанет</span>

    let form
    if (!(n % 100 > 4 && n % 100 < 21) && n % 10 > 1 && n % 10 < 5)
      form = 'человека'
    else
      form = 'человек'

    return <span className='badge bg-primary'>{`${n} ${form} тусанет с тобой сегодня`}</span>
  }

  return (
    <>
      {renderPhrase(length)}
    </>
  )
}

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
}

export default SearchStatus