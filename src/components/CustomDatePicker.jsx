import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'src/assets/styles/date-picker.scss';

const CustomDatePicker = ({ selected, onChange }) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      showIcon
      dateFormat="dd/MM/yyyy"
      placeholderText="Due date"
      isClearable
      minDate={new Date()}
    />
  );
};

export default CustomDatePicker;
