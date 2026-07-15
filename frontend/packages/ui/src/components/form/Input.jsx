import React from 'react';
import { ErrorMessage, Field } from 'formik';
import PropTypes from 'prop-types';
import Label from './Label';
import InputFieldError from './InputFieldError';

const Input = ({
  name,
  text,
  type,
  placeholder = 'Enter Value',
  required = false,
  hideHandler = () => {},
}) => {
  return (
    <div className="mb-3">
      <Label name={name} text={text} required={required} />
      <Field
        id={name}
        name={name}
        type={type}
        autocomplete="off"
        className="w-full py-4 px-3 rounded border outline-none transition-all duration-300 border-gray-400 focus:ring-1 h-[50px] box-border"
        placeholder={placeholder}
      />
      <InputFieldError name={name} />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  hideHandler: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;
