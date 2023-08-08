import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getQualities, getQualitiesLoadingStatus } from '../../store/qualities'
import { getProfessions, getProfessionsLoadingStatus } from '../../store/professions'

const UserEditForm = ({ id }) => {
  const history = useHistory()
  const { currentUser: user } = useAuth()

  const { updateUser } = useAuth()

  const professionsList = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())
  const professions = professionsList?.map(p => ({ ...p, label: p.name, value: p._id })) || []

  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = useSelector(getQualities())
  const qualities = qualitiesList?.map(q => ({ label: q.name, value: q._id })) || []

  const [errors, setErrors] = useState({})

  const [data, setData] = useState({
    ...user,
    qualities: user.qualities.map(id => qualities.find(q => q.value === id))
  })

  useEffect(() => {
    history.replace(`/users/${user._id}/edit`)
  }, [id])

  useEffect(() => {
    validate()
  }, [data])

  const validatorConfig = {
    name: {
      isRequired: { message: 'Имя обязательно для заполнения' },
      min: {
        value: 3,
        message: 'Должно быть минимум 3 символа'
      }
    },
    email: {
      isRequired: { message: 'Email обязателен для заполнения' },
      isEmail: { message: 'Email введен некорректно' }
    },
    qualities: {
      isRequired: { message: 'Нужно выбрать хотя бы одно качество' },
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

    const newData = { ...data, qualities: data.qualities.map(q => q.value) }
    await updateUser(newData)
    history.push(`/users/${id}`)
  }

  const isValid = !Object.keys(errors).length

  return (
      <>
      {!professionsLoading && !qualitiesLoading ? (
        <form onSubmit={handleSubmit}>
          <TextField label="Имя" name="name" value={data.name} onChange={handleChange}
                     error={errors.name}/>
          <TextField label="Электронная почта" name="email" value={data.email} onChange={handleChange}
                     error={errors.email}/>
          <SelectField onChange={handleChange} defaultOption="Choose..." label='Выберите вашу профессию'
                       value={data.profession} options={professions} name='profession' />
          <RadioField
              onChange={handleChange}
              options={[{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }, { name: 'Other', value: 'other' }]}
              name='sex' value={data.sex} label="Выберите ваш пол" />
          <MultiSelectField onChange={handleChange} options={qualities} name="qualities" label="Выберите ваши качества"
                            defaultValue={data.qualities} error={errors.qualities} />
          <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">Обновить</button>
        </form>
      ) : <h3>Loading...</h3>}
      </>
  )
}

UserEditForm.propTypes = {
  id: PropTypes.string.isRequired,
}

export default UserEditForm