import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({ label, rows, name, value, onChange, error, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState)
  }

  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }

  return (
      <>
        <div className='mb-4'>
          <label htmlFor={name} className='form-label'>{label}</label>
          <div className="input-group has-validation">
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className={getInputClasses()}
                placeholder={placeholder}
                rows={rows}
            />
            { error && <div className='invalid-feedback'>{error}</div> }
          </div>

        </div>
      </>
  )
}

TextField.defaultProps = {
  type: 'text',
  error: '',
  placeholder: ''
}

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
}

export default TextField
