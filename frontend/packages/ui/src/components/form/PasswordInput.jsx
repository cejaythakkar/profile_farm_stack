import React, { useState } from 'react';
import { ErrorMessage, Field } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import propTypes from 'prop-types';
import PropTypes from 'prop-types';
import Label from './Label';
import InputFieldError from './InputFieldError';

const PasswordInput = ({ name, text, placeholder = 'Enter Your Password' }) => {
  const [isHide, setIsHide] = useState(true);
  return (
    <div className="mb-3">
      <Label name={name} text={text} required={true} />
      <div className="rounded border outline-none transition-all duration-300 border-gray-400 focus:ring-1 flex">
        <Field
          id={name}
          name={name}
          autocomplete="off"
          type={isHide ? 'password' : 'text'}
          className="w-full py-3 px-4 outline-none border-none"
          placeholder={placeholder}
        />
        <button
          onClick={() => {
            setIsHide(!isHide);
          }}
          type="button"
          className="px-4 cursor-pointer text-2xl"
        >
          {isHide ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      <InputFieldError name={name} />
    </div>
  );
};

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default PasswordInput;
