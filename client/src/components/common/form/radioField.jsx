import React from 'react'
import PropTypes from 'prop-types'

const RadioField = ({ options, name, onChange, value, label }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  return (
    <>
      <div className="mb-4">
        <label htmlFor="" className="from-label">{label}</label>
        <div>
          {options.map(option => (
              <div className="form-check form-check-inline" key={option.name + '_' + option.value}>
                <input type="radio" className="form-check-input" name={name} checked={option.value === value}
                       id={option.name + '_' + option.value} value={option.value} onChange={handleChange} />
                <label className='form-check-label' htmlFor={option.name + '_' + option.value}>{option.name}</label>
              </div>
          ))}
        </div>
      </div>
    </>
  )
}

RadioField.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
}

export default RadioField