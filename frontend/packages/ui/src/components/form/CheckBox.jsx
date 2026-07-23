import React from 'react';
import { ErrorMessage, Field } from 'formik';
import PropTypes from 'prop-types';
import Label from './Label';
import InputFieldError from './InputFieldError';

const CheckBox = ({
  name,
  text,
  type,
  required = false,
  noLabel = false,
  hideHandler = () => {},
}) => {
  return (
    <div className="mb-3">
      {!noLabel && <Label name={name} text={text} required={required} />}
      <Field
        id={name}
        name={name}
        type={type}
        autocomplete="off"
        className="w-fit h-fit py-4 px-3 rounded border outline-none transition-all duration-300 border-gray-400 focus:ring-1 box-border text-white"
      />
      <InputFieldError name={name} />
    </div>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  hideHandler: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default CheckBox;
