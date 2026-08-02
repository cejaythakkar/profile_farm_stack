import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { components as selectComponents } from 'react-select';
import Label from '../Label';
import InputFieldError from '../InputFieldError';

import './ChipInput.css';

const components = {
  DropdownIndicator: null,

  MultiValue: (props) => {
    return (
      <div title={props.data.label} className='h-fit'>
        <selectComponents.MultiValue 
          {...props}
          innerProps={{ ...props.innerProps, title: props.data.label }}
         
        >{props.children}</selectComponents.MultiValue >
      </div>
    );
  },
};

export default ({
  name,
  text,
  required,
  labelRequired = true,
  value,
  setValue,
}) => {
  const [inputValue, setInputValue] = React.useState('');
  
  const createOption = (label) => ({
    label,
    value: label,
  });
  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue(name, [...value, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
    }
  };
  return (
    <div className="multi-line-chip-input-wrapper flex-col items-center w-full">
      {labelRequired && <Label name={name} text={text} required={required} />}
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => {
          setValue(name, newValue);
        }}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        classNamePrefix="selectBox"
        placeholder="Type something and press enter..."
        className="selectBox-container items-center flex w-full rounded outline-none transition-all duration-300 border-gray-400 focus:ring-1 text-white bg-transparent"
        value={value}
      />
      <InputFieldError name={name} />
    </div>
  );
};
