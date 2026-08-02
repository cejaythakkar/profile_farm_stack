import React from 'react';
import { ErrorMessage, Field } from 'formik';
import PropTypes from 'prop-types';
import Label from './Label';
import InputFieldError from './InputFieldError';
import RichTextEditor from './RichTextEditor';

const RteInput = ({
  name,
  text,
  type,
  placeholder = 'Enter Value',
  required = false,
  noLabel = false,
  hideHandler = () => {},
  setFieldValue = () => {},
  innerRef = null,
  onChange = () => {},
}) => {
  
  return (
    <div className="mb-3">
      {!noLabel && <Label name={name} text={text} required={required} />}
      <RichTextEditor name={name} innerRef={innerRef} onChange={onChange} />
      <InputFieldError name={name} />
    </div>
  );
};

RteInput.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  hideHandler: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default RteInput;
