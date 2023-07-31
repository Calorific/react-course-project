import React, { useEffect, useState } from 'react'
import api from '../../API'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom'

const userEditForm = () => {
  const { id } = useParams()
  const history = useHistory()

  const [data, setData] = useState({})
  const [qualities, setQualities] = useState({})
  const [professions, setProfessions] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    async function func() {
      const data = await api.users.getById(id)
      const qualities = await api.qualities.fetchAll()
      const professions = await api.professions.fetchAll()

      setProfessions(professions)
      setQualities(qualities)

      const qualitiesValues = Object.keys(qualities)

      data.qualities = data.qualities.map(q => ({
        ...q,
        label: q.name,
        value: qualitiesValues.find(value => qualities[value]._id === q._id)
      }))

      data.profession = Object.keys(professions).find(key => professions[key]._id === data.profession._id)

      setData(data)
    }
    func()

  }, [])

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
    }
  }

  const handleChange = target => {
    if (target.name === 'qualities')
      target.value = target.value.map(q => ({ ...q, ...qualities[q.value] }))
    
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

    api.users.update(id, { ...data, profession: professions[data.profession] })
      .then(() => history.push('/users/' + id))
  }

  const isValid = !Object.keys(errors).length

  return (
      <>
      {data && Object.keys(data).length ? (
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
                            defaultValue={data.qualities} />
          <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">Обновить</button>
        </form>
      ) : <h3>Loading...</h3>}
      </>
  )
}

export default userEditForm