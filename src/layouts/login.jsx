import React, { useEffect, useState } from 'react'
import TextField from '../components/textField'
import { validator } from '../utils/validator'

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' })
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

  const handleChange = e => {
    setData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }
  
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return !Object.keys(errors).length
  }
  
  const handleSubmit = e => {
    e.preventDefault()
    if (!validate()) return
    console.log('submit')
  }

  const isValid = !Object.keys(errors).length

  return (
    <div className='container mt-5'>
      <div className="ro">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField label='Электронная почта' name='email' value={data.email} onChange={handleChange} error={errors.email} />
            <TextField label='Пароль' type='password' name='password' value={data.password} onChange={handleChange} error={errors.password} />
            <button type='submit' disabled={!isValid} className='btn btn-primary w-100 mx-auto'>Отправить</button>
          </form>
        </div>

      </div>

    </div>
  )
}

export default Login