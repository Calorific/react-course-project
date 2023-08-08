import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import professionService from '../services/profession.service'
import { toast } from 'react-toastify'

const ProfessionContext = React.createContext(undefined)

export const useProfessions = () => useContext(ProfessionContext)

export const ProfessionProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [professions, setProfessions] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (error) {
      toast.error(error.message)
      setError(null)
    }
  }, [error])

  useEffect(() => {
    getProfessionsList().then(() => {})
  }, [])

  function getProfession(id) {
    return professions.find(p => p._id === id)
  }
  
  async function getProfessionsList() {
    try {
      const { content } = await professionService.fetchAll()
      setProfessions(content)
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
    <ProfessionContext.Provider value={{ loading, professions, getProfession }}>
      {children}
    </ProfessionContext.Provider>
  )
}

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}