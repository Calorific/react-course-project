import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TextareaField from '../form/textareaField'
import api from '../../../API'
import { validator } from '../../../utils/validator'
import { useComments } from '../../../hooks/useComments'

const CommentForm = ({ id }) => {
  const { createComment } = useComments()

  const [data, setData] = useState({ content: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    validate()
  }, [data])

  const validatorConfig = {
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

    if (!validate())
      return

    setData({ content: '' })
    setErrors({})
    createComment(data)
  }

  const isValid = !Object.keys(errors).length
  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <div>
            <h2>New comment</h2>
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
