import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import CheckboxField from '../common/form/checkboxField'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const LoginForm = () => {
  const history = useHistory()
  const { signIn } = useAuth()
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    validate()
  }, [data])


  const validatorConfig = {
    email: {
      isRequired: { message: 'Email обязателен для заполнения' },
      isEmail: { message: 'Email введен некорректно' }
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения' },
      hasCapital: { message: 'Должна быть хотя бы одна заглавная буква' },
      hasDigit: { message: 'Должна быть хотя бы одна цифра' },
      min: {
        value: 8,
        message: 'Должно быть минимум 8 символов'
      }
    }
  }

  const handleChange = target => {
    setData(prevState => ({ ...prevState, [target.name]: target.value }))
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return !Object.keys(errors).length
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validate()) return
    const redirectTo = history.location.state ? history.location.state.from.pathname : '/'
    try {

      await signIn(data)
      history.push(redirectTo)
    } catch (e) {
      setErrors(e)
    }
  }

  const isValid = !Object.keys(errors).length

  return (
      <form onSubmit={handleSubmit}>
        <TextField label="Электронная почта" name="email" value={data.email} onChange={handleChange}
                   error={errors.email}/>
        <TextField label="Пароль" type="password" name="password" value={data.password} onChange={handleChange}
                   error={errors.password}/>
        <CheckboxField onChange={handleChange} name="stayOn" value={data.stayOn}>
          Оставаться в системе
        </CheckboxField>
        <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">Отправить</button>
      </form>
  )
}


export default LoginForm