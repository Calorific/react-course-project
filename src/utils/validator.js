const validate = (validationMethod, data, config) => {
  let status
  switch (validationMethod) {
    case 'isRequired':
      if (typeof data === 'boolean')
        status = !data
      else if (typeof data === 'string')
        status = !data.trim()
      else if (Array.isArray(data))
        status = !data.length
      else
        status = !data
      break
    case 'isEmail':
      const emailRegexp = /^\S+@\S+\.\S+$/g
      status = !emailRegexp.test(data)
      break
    case 'hasCapital':
      const capitalRegexp = /[A-Z]+/g
      status = !capitalRegexp.test(data)
      break
    case 'hasDigit':
      const digitRegexp = /\d+/g
      status = !digitRegexp.test(data)
      break
    case 'min':
      status = data.length < config.value
      break
  }
  if (status)
    return config.message
}
export function validator(data, config) {
  const errors = {}
  for (const fieldName in data) {
    for (const validationMethod in config[fieldName]) {
      const error = validate(validationMethod, data[fieldName], config[fieldName][validationMethod])
      if (error && !errors[fieldName]) errors[fieldName] = error
    }
  }
  return errors
}