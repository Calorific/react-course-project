import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TextareaField from '../form/textareaField'
import { validator } from '../../../utils/validator'
import { createComment } from '../../../store/comments'
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserId } from '../../../store/users'

const CommentForm = ({ id }) => {
  const dispatch = useDispatch()
  const currentUserId = useSelector(getCurrentUserId())

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

    const newData = {
      ...data,
      pageId: id,
      created_at: Date.now(),
      userId: currentUserId,
      _id: nanoid()
    }

    setData({ content: '' })
    setErrors({})
    dispatch(createComment(newData))
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
