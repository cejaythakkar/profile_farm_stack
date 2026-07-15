import React from 'react';
import Label from './Label';
import { ErrorMessage, Field } from 'formik';
import InputFieldError from './InputFieldError';
const Textarea = ({ name, text, required }) => {
  return (
    <div className="mb-3">
      <Label name={name} text={text} required={required} />
      <Field
        id={name}
        name={name}
        as="textarea"
        rows={5}
        placeholder="Enter Address"
        className="border border-gray-500 rounded w-full text-white px-4 py-3 box-border"
      />
      <InputFieldError name={name} />
    </div>
  );
};

export default Textarea;
