import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import api from '../../API'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckboxField from '../common/form/checkboxField'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    license: false
  })
  const [qualities, setQualities] = useState({})
  const [professions, setProfessions] = useState()
  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.professions.fetchAll().then(data => setProfessions(data))
    api.qualities.fetchAll().then(data => setQualities(data))
  })

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
    },
    profession: {
      isRequired: {
        message: 'Профессия должна быть выбрана'
      }
    },
    license: {
      isRequired: {
        message: 'Вы не можете пользоваться нашим сервисом без подтверждения лицензионного соглашения'
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

  const handleSubmit = e => {
    e.preventDefault()
    if (!validate()) return
    console.log('submit')
  }

  const isValid = !Object.keys(errors).length

  return (
      <form onSubmit={handleSubmit}>
        <TextField label="Электронная почта" name="email" value={data.email} onChange={handleChange}
                   error={errors.email}/>
        <TextField label="Пароль" type="password" name="password" value={data.password} onChange={handleChange}
                   error={errors.password}/>
        <SelectField onChange={handleChange} defaultOption="Choose..." label='Выберите вашу профессию'
                     error={errors.profession} value={data.profession} options={professions} name='profession' />
        <RadioField
            onChange={handleChange}
            options={[{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }, { name: 'Other', value: 'other' }]}
            name='sex' value={data.sex} label="Выберите ваш пол" />
        <MultiSelectField onChange={handleChange} options={qualities} name="qualities" label="Выберите ваши качества"
                          defaultValue={data.qualities}/>
        <CheckboxField onChange={handleChange} name="license" value={data.license} error={errors.license}>
          Принимаю <a href="">Лицензионное соглашение</a>
        </CheckboxField>
        <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">Отправить</button>
      </form>
  )
}


export default RegisterForm