import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualities }) => {
  const { loading } = useQualities()
  if (loading)
    return 'Loading...'
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