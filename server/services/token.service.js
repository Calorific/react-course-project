const jwt = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/Token')

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get('accessSecretKey'), {
      expiresIn: '1h'
    })
    const refreshToken = jwt.sign(payload, config.get('refreshSecretKey'))

    return {
      accessToken, refreshToken, expiresIn: 3600
    }
  }
  async save(user, refreshToken) {
    const data = await Token.findOne({ user })
    if (data) {
      data.refreshToken = refreshToken
      return data.save()
    }
    return await Token.create({ user, refreshToken })
  }
  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get('refreshSecretKey'))
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get('accessSecretKey'))
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken })
    } catch (e) {
      return null
    }
  }
}

module.exports = new TokenService()