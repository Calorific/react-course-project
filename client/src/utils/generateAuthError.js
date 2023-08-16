function generateAuthError(error) {
  const { code, message } = error.response.data.error

  if (code === 400) {
    if (message === 'EMAIL_EXISTS') {
      return {
        email: 'Пользователь с таким email уже существует'
      }
    }

    if (message === 'INVALID_PASSWORD') {
      return {
        password: 'Неверный пароль'
      }
    }

    if (message === 'EMAIL_NOT_FOUND')
      return {
        email: 'Пользователя с таким email не существует'
      }

    return null
  }
}

export default generateAuthError