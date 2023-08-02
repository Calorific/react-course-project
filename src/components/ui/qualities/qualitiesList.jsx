import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'

const QualitiesList = ({ qualities }) => {
  
  return (
    <>
      {qualities.map(q => <Quality qualityId={q} key={q} />)}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired,
}

export default QualitiesList