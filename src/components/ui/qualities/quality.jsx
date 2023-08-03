import React from 'react'
import PropTypes from 'prop-types'
import { useQualities } from '../../../hooks/useQualities'

const Quality = ({ qualityId }) => {
  const { getQuality } = useQualities()
  const quality = getQuality(qualityId)
  return (
      <>
         <span className={'badge m-1  bg-' + quality.color}>{quality.name}</span>
      </>
  )
}

Quality.propTypes = {
  qualityId: PropTypes.string.isRequired,
}

export default Quality