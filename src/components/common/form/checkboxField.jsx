import React from 'react'
import PropTypes from 'prop-types'

const CheckboxField = ({ name, value, onChange, children, error }) => {
  const handleChange = (e) => {
    onChange({ name, value: !value })
  }

  const getInputClasses = () => {
    return 'form-check-input' + (error ? ' is-invalid' : '')
  }

  return (
      <>
        <div className="form-check mb-4">
          <input type="checkbox" value={value} name={name} id={name} onChange={handleChange} className={getInputClasses()}
                 checked={value} />
          <label htmlFor={name} className="form-check-label">
            {children}
          </label>
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </>
  )
}

CheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  error: PropTypes.string
}

export default CheckboxField