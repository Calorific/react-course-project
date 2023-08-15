import professions from '../mockData/professions.json'
import qualities from '../mockData/qualities.json'
import users from '../mockData/users.json'
import { useEffect, useState } from 'react'
import httpService from '../services/http.service'

const useMockData = () => {
  const statusConst = {
    idle: 'Not started',
    pending: 'In process',
    success: 'Ready',
    error: 'Error occurred'
  }
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(statusConst.idle)
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)
  const summaryCount = professions.length + qualities.length + users.length
  
  const incrementCount = () => {
    setCount(prevState => prevState + 1)
  }
  const updateProgress = () => {
    if (count && status === statusConst.idle)
      setStatus(statusConst.pending)

    const newProgress = Math.floor(count / summaryCount * 100)
    if (progress < newProgress)
      setProgress(() => newProgress)

    if (newProgress === 100)
      setStatus(statusConst.success)
  }

  useEffect(() => {
    updateProgress()
  }, [count])
  
  async function initialize() {
    try {
      for (const profession of professions) {
        await httpService.put('profession/' + profession._id, profession)
        incrementCount()
      }
      for (const user of users) {
        await httpService.put('user/' + user._id, user)
        incrementCount()
      }
      for (const quality of qualities) {
        await httpService.put('quality/' + quality._id, quality)
        incrementCount()
      }
    } catch (e) {
      setError(e)
      setStatus(statusConst.error)
    }

  }

  return { error, initialize, progress, status }
}

export default useMockData