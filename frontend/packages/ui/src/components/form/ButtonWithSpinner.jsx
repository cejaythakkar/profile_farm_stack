import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';

const colorClasses = {
  blue: 'border-blue-600 bg-blue-700 hover:text-blue-700 hover:ring-blue-600 disabled:text-white disabled:bg-blue-500 disabled:cursor-not-allowed',
  green:
    'border-green-600 bg-green-700 hover:text-green-700 hover:ring-green-600 disabled:text-white disabled:bg-green-500 disabled:cursor-not-allowed',
  red: 'border-red-600 bg-red-700 hover:text-red-700 hover:ring-red-600 disabled:text-white disabled:bg-red-500 disabled:cursor-not-allowed',
};
const ButtonWithSpinner = ({
  type = 'button',
  disabled,
  loading,
  color = 'blue',
  name,
  text,
  classes = '',
  clickHandler = () => {},
}) => {
  const customClasses = disabled
    ? ''
    : 'transition-all duration-200 hover:bg-white hover:cursor-pointer hover:ring-2';
    
  return (
    <button
      type={type}
      disabled={disabled}
      name={name}
      className={`${customClasses} px-4 py-1.5
            flex justify-center items-center  cursor-pointer rounded border box-border   gap-x-1 text-sm font-medium  text-white  hover:cursor-pointer ${colorClasses[color]} ${classes}`}
      onClick={(event) => clickHandler(event)}
    >
      <span>{text}</span>
      {loading ? (
        <CgSpinner className="animate-spin text-xl text-white" />
      ) : (
        <FaArrowRight className="text-sm" />
      )}
    </button>
  );
};

export default ButtonWithSpinner;
