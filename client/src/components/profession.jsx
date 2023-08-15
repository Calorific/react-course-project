import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getProfessionById, getProfessionsLoadingStatus } from '../store/professions'

const Profession = ({ id }) => {
  const loading = useSelector(getProfessionsLoadingStatus())
  const profession = useSelector(getProfessionById(id))

  return (
    <>
      {!loading ? profession.name : 'Loading...'}
    </>
  )
}

Profession.propTypes = {
  id: PropTypes.string,
}

export default Profession