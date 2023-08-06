import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import { httpAuth } from '../hooks/useAuth'
import localStorageService from './localStorage.service'

const http = axios.create({
  baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(
  async function(config) {
    if (configFile.isFirebase) {
      const containsSlash = /\/$/gi.test(config.url)
      config.url = (containsSlash ? config.url.slice(0, -1) : config.url) + '.json'

      const expiresDate = localStorageService.getExpires()
      const refreshToken = localStorageService.getRefreshToken()
      if (refreshToken && expiresDate < Date.now()) {
        const { data } = await httpAuth.post('token', {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
        
        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
          localId: data.user_id
        })
      }
    }

    const accessToken = localStorageService.getAccessToken()
    if (accessToken) {
      config.params = { ...config.params, auth: accessToken }
    }

    return config
  }, function(e) {
    return Promise.reject(e)
  }
)

function transformData(data) {
  return data && !data._id ? Object.keys(data).map(key => ({ ...data[key] })) : data
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