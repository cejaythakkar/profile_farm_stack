import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';


const ButtonWithSpinner = ({
  type = 'button',
  disabled,
  loading,
  name,
  text,
  clickHandler = () => {}
}) => {
  
  return (
    <button
      type={type}
      disabled={disabled}
      name={name}
      className={`px-4 py-1.5
            flex justify-center items-center bg-blue-700 cursor-pointer disabled:cursor-no-drop disabled:bg-blue-500 rounded border box-border  transition-all duration-300 gap-x-1 text-sm font-medium  text-white hover:bg-white hover:cursor-pointer hover:text-blue-700 hover:ring-2 border-blue-600`}
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
