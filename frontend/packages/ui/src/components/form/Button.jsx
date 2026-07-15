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
  blue: 'border-blue-600 bg-blue-700 hover:text-blue-700 hover:ring-blue-600',
  green:
    'border-green-600 bg-green-700 hover:text-green-700 hover:ring-green-600',
  red: 'border-red-600 bg-red-700 hover:text-red-700 hover:ring-red-600',
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
  return (
    <button
      type={type}
      disabled={disabled}
      name={name}
      className={`transition-all duration-200 rounded border box-border px-4 py-1.5 h-fit text-sm font-medium  text-white hover:bg-white hover:cursor-pointer  hover:ring-2 ${colorClasses[color]} ${classes}`}
      onClick={(event) => clickHandler(event)}
    >
      {iconName ? <SelectedIcon className="w-4 h-4 pointer-events-none" name={name} /> : text}
    </button>
  );
};

export default Button;
