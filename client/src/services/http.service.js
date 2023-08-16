import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import localStorageService from './localStorage.service'
import authService from './auth.service'

const http = axios.create({
  baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(
  async function(config) {
    const expiresDate = localStorageService.getExpires()
    const refreshToken = localStorageService.getRefreshToken()

    const isExpired = refreshToken && expiresDate < Date.now()

    if (configFile.isFirebase) {
      const containsSlash = /\/$/gi.test(config.url)
      config.url = (containsSlash ? config.url.slice(0, -1) : config.url) + '.json'


      if (isExpired) {
        const data = await authService.refresh()
        
        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
          localId: data.user_id
        })
      }
    } else {
      if (isExpired) {
        const data = await authService.refresh()

        localStorageService.setTokens(data)
      }
    }

    const accessToken = localStorageService.getAccessToken()
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`
      }
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
  res.data = { content: configFile.isFirebase ? transformData(res.data) : res.data }
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
  patch: http.patch,
  delete: http.delete
}

export default httpService