import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import qualityService from '../services/qualities.service'

const QualityContext = React.createContext()

export const useQualities = () => {
  return useContext(QualityContext)
}

const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getQualitiesList().then()
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  function getQuality(id) {
    return qualities.find(q => q._id === id)
  }

  async function getQualitiesList() {
    try {
      const { content } = await qualityService.get()
      setQualities(content)
      setLoading(false)
    } catch (e) {
      errorCatcher(e)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  return (
      <QualityContext.Provider value={{ qualities, getQualitiesList, getQuality, loading }}>
        {!loading ? children : 'Loading...'}
      </QualityContext.Provider>
  )
}

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default QualityProvider