import React from 'react';
import DatePicker from 'react-datepicker';
import Label from '../Label';
import InputFieldError from '../InputFieldError';

import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker = ({
  selectedDate,
  setSelectedDate,
  name,
  text,
  required,
}) => {
  return (
    <div className="mb-3">
      <Label name={name} text={text} required={required} />
      <DatePicker
        selected={selectedDate}
        onChange={(date, e) => {
          
          const tempDate = new Date(date);
          const tempDay = tempDate.getDate();
          const tempMonth = tempDate.getMonth();
          const tempYear = tempDate.getFullYear();
          // console.log('tempDate', `${tempDay}-${tempMonth + 1}-${tempYear}`);
          setSelectedDate(name, `${tempMonth + 1}-${tempDay}-${tempYear}`);
          // setSelectedDate(`${name}_string`, `${tempDay}-${tempMonth + 1}-${tempYear}`);
        }}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText="Enter Date of Birth"
        dateFormat="dd/MM/yyyy"
      />
      <InputFieldError name={name} />
    </div>
  );
};

export default MyDatePicker;
