import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TextareaField from '../form/textareaField'
import api from '../../../API'
import { validator } from '../../../utils/validator'
import SelectField from '../form/selectField'

const CommentForm = ({ id, onAdd }) => {
  const initialState = { user: '', content: '' }

  const [data, setData] = useState(initialState)

  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data.map(u => ({ value: u._id, name: u.name }))))
  }, [])

  useEffect(() => {
    validate()
  }, [data])

  const validatorConfig = {
    user: {
      isRequired: { message: 'Пользователь должен быть выбран' }
    },
    content: {
      isRequired: { message: 'Поле обязательно для заполнения' }
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
    setData(initialState)
    setErrors({})
    api.comments.add({ pageId: id, userId: data.user, content: data.content }).then(comment => onAdd(comment))
  }

  const isValid = !Object.keys(errors).length
  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <div>
            <h2>New comment</h2>
            <SelectField onChange={handleChange} name='user' value={data.user} defaultOption='Выберите пользователя'
              options={users} error={errors.user} />
            <TextareaField name='content' value={data.content} onChange={handleChange} label='Сообщение'
              error={errors.content} rows={3} />
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary " onClick={handleSubmit} type='submit' disabled={!isValid}>
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

CommentForm.propTypes = {
  id: PropTypes.string.isRequired,
  onAdd: PropTypes.func
}

export default CommentForm
