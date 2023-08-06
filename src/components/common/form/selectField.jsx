import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({ label, value, onChange, defaultOption, options, error, name }) => {
  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '')
  }

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const optionsArray = !Array.isArray(options) && typeof options === 'object'
    ? Object.keys(options).map(value => ({ name: options[value].name, value }))
    : options

  return (
    <>
      <div className="mb-4">
        <label htmlFor={name} className='form-label'>{label}</label>
        <select name={name} id={name} className={getInputClasses()} value={value} onChange={handleChange}>
          <option value="" disabled>{defaultOption}</option>
          {optionsArray && optionsArray.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {error && <div className="invalid-feedback">
          {error}
        </div>}
      </div>
    </>
  )
}

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  error: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default SelectField