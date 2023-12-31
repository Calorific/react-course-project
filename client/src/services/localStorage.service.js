const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'user-local-id'

export const setTokens = ({ expiresIn = 3600, idToken, localId, refreshToken }) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(TOKEN_KEY, idToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate.toString())
  localStorage.setItem(USERID_KEY, localId)
}

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_KEY)
}

export const getExpires = () => {
  return localStorage.getItem(EXPIRES_KEY)
}

export const getUserId = () => {
  return localStorage.getItem(USERID_KEY)
}

export const removeAuthData = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(EXPIRES_KEY)
  localStorage.removeItem(USERID_KEY)
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpires,
  getUserId,
  removeAuthData
}

export default localStorageService