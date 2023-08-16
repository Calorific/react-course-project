import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckboxField from '../common/form/checkboxField'
import { useDispatch, useSelector } from 'react-redux'
import { getQualities } from '../../store/qualities'
import { getProfessions } from '../../store/professions'
import { signUp } from '../../store/users'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email: '',
    name: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    license: false
  })
  const [errors, setErrors] = useState({})

  const qualities = useSelector(getQualities()) || []
  const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }))

  const professions = useSelector(getProfessions()) || []
  const professionsList = professions.map(p => ({ label: p.name, value: p._id }))

  useEffect(() => {
    validate()
  }, [data])

  const validatorConfig = {
    email: {
      isRequired: { message: 'Email обязателен для заполнения' },
      isEmail: { message: 'Email введен некорректно' }
    },
    name: {
      isRequired: { message: 'Имя обязательно для заполнения' },
      min: {
        value: 3,
        message: 'Должно быть минимум 3 символа'
      }
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
    },
    qualities: {
      isRequired: { message: 'Нужно выбрать хотя бы одно качество' }
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

    const newData = { ...data, qualities: data.qualities.map(q => q.value), favourites: [] }
    dispatch(signUp(newData))
  }

  const isValid = !Object.keys(errors).length

  return (
      <form onSubmit={handleSubmit}>
        <TextField label="Электронная почта" name="email" value={data.email} onChange={handleChange}
                   error={errors.email}/>
        <TextField label="Имя" name="name" value={data.name} onChange={handleChange}
                   error={errors.name}/>
        <TextField label="Пароль" type="password" name="password" value={data.password} onChange={handleChange}
                   error={errors.password}/>
        <SelectField onChange={handleChange} defaultOption="Choose..." label='Выберите вашу профессию'
                     error={errors.profession} value={data.profession} options={professionsList} name='profession' />
        <RadioField
            onChange={handleChange}
            options={[{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }, { name: 'Other', value: 'other' }]}
            name='sex' value={data.sex} label="Выберите ваш пол" />
        <MultiSelectField onChange={handleChange} options={qualitiesList} name="qualities"
                          label="Выберите ваши качества" error={errors.qualities} />
        <CheckboxField onChange={handleChange} name="license" value={data.license} error={errors.license}>
          Принимаю <a href="">Лицензионное соглашение</a>
        </CheckboxField>
        <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">Отправить</button>
      </form>
  )
}


export default RegisterForm