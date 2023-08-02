import React from 'react'
import PropTypes from 'prop-types'
import { useQualities } from '../../../hooks/useQualities'

const Quality = ({ qualityId }) => {
  const { loading, getQuality } = useQualities()
  const quality = getQuality(qualityId)
  return (
      <>
        {!loading
          ? <span className={'badge m-1  bg-' + quality.color}>{quality.name}</span>
          : 'Loading...'
        }
      </>
  )
}

Quality.propTypes = {
  qualityId: PropTypes.string.isRequired,
}

export default Quality