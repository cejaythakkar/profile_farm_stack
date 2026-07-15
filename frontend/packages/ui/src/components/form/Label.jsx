import React from 'react'

const Label = ({name, text, required}) => {
  return (
    <label htmlFor={name} className="block text-white mb-2">
        {text} {required && <span className="text-red-500">*</span>}
      </label>
  )
}

export default Label