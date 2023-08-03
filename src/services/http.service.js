import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'

const http = axios.create({
  baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(
  function(config) {
    if (configFile.isFirebase) {
      const containsSlash = /\/$/gi.test(config.url)
      config.url = (containsSlash ? config.url.slice(0, -1) : config.url) + '.json'
    }
    return config
  }, function(e) {
    return Promise.reject(e)
  }
)

function transformData(data) {
  return data ? Object.keys(data).map(key => ({ ...data[key] })) : []
}

http.interceptors.response.use(res => {
  if (configFile.isFirebase) res.data = { content: transformData(res.data) }
  return res
}, function(e) {
  const expectedError = e.response && e.response.status >= 400 && e.response.status < 500
  if (!expectedError) {
    console.log(e)
    toast.error('Something went wrong...')
  }
  return Promise.reject(e)
})

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
}

export default httpService