import React, { useState } from 'react'
import PropTypes from 'prop-types'
import placeholder from 'lodash/fp/placeholder'

const TextField = ({ label, type, name, value, onChange, error, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false)
  
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
          <input
              id={name}
              type={showPassword ? 'test' : type}
              name={name}
              value={value}
              onChange={onChange}
              className={getInputClasses()}
              placeholder={placeholder}
          />
          {type === 'password' && (
            <button className="btn btn-outline-secondary" type="button" onClick={toggleShowPassword}>
              <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
            </button>
          )}
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
  placeholder: PropTypes.string
}

export default TextField