import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const optionsArray = !Array.isArray(options) && typeof options === 'object'
    ? Object.keys(options).map(_id => ({ label: options[_id].name, value: _id }))
    : options
  const handleChange = value => {
    onChange({ name, value })
  }
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select onChange={handleChange} className='basic-multi-select' isMulti options={optionsArray}
              closeMenuOnSelect={false} defaultValue={defaultValue} />
    </div>
  )
}

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.array
}

export default MultiSelectField