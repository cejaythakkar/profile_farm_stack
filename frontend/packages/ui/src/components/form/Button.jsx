import React from 'react';
import { FaEdit, FaTrashAlt, FaCog, FaCode, FaEye, FaTimes } from 'react-icons/fa';

const REACT_ICONS_MAP = {
  edit: FaEdit,
  delete: FaTrashAlt,
  settings: FaCog,
  tech: FaCode,
  view: FaEye,
};
const colorClasses = {
  blue: 'border-blue-600 bg-blue-700 hover:text-blue-700 hover:ring-blue-600 disabled:text-white disabled:bg-blue-500 disabled:cursor-not-allowed',
  green:
    'border-green-600 bg-green-700 hover:text-green-700 hover:ring-green-600 disabled:text-white disabled:bg-blue-500 disabled:cursor-not-allowed',
  red: 'border-red-600 bg-red-700 hover:text-red-700 hover:ring-red-600 disabled:text-white disabled:bg-blue-500 disabled:cursor-not-allowed',
};
const Button = ({
  type = 'button',
  disabled,
  name,
  text,
  clickHandler = () => {},
  color = 'blue',
  classes,
  iconName,
}) => {
  const SelectedIcon = iconName ? REACT_ICONS_MAP[iconName.toLowerCase()] : '';
  const customClasses = disabled ? '' : 'transition-all duration-200 hover:bg-white hover:cursor-pointer hover:ring-2';
  return (
    <button
      type={type}
      disabled={disabled}
      name={name}
      className={`${customClasses} rounded border box-border px-4 py-1.5 h-fit text-sm font-medium  text-white  ${colorClasses[color]} ${classes}`}
      onClick={(event) => clickHandler(event)}
    >
      {iconName ? <SelectedIcon className="w-4 h-4 pointer-events-none" name={name} /> : text}
    </button>
  );
};

export default Button;
