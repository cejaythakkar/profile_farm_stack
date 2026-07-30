import React from 'react';
import Select from 'react-select';
import './ChipInput.css';
import Label from './Label';

const SelectBox = ({
  name,
  options,
  isLoading,
  text,
  labelRequired = true,
  required = false,
  value,
  onChangeHandler = () => {},
}) => {
  return (
    <div className="flex-col items-center w-full">
      {labelRequired && <Label name={name} text={text} required={required} />}
      <Select
        className="basic-single"
        classNamePrefix="select"
        isLoading={isLoading}
        name={name}
        options={options}
        value={value}
        onChange={(selectedOption) => {
          onChangeHandler(name, selectedOption);
        }}
      />
    </div>
  );
};

export default SelectBox;
