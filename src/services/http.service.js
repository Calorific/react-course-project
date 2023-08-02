import axios from 'axios'
import { toast } from 'react-toastify'
import config from '../config.json'

axios.defaults.baseURL = config.apiEndpoint

axios.interceptors.response.use(res => res, function(e) {
  const expectedError = e.response && e.response.status >= 400 && e.response.status < 500
  if (!expectedError) {
    console.log(e)
    toast.error('Something went wrong...')
  }
  return Promise.reject(e)
})

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
}

export default httpService