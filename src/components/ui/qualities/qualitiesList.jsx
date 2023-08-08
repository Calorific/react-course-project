import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useDispatch, useSelector } from 'react-redux'
import { getQualitiesByIds, getQualitiesLoadingStatus, loadQualitiesList } from '../../../store/qualities'

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch()

  const loading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = useSelector(getQualitiesByIds(qualities))
  
  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])
  
  if (loading)
    return 'Loading...'

  return (
    <>
      {qualitiesList?.map(q => <Quality {...q} key={q._id} />)}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array,
}

export default QualitiesList