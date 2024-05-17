import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'src/assets/styles/date-picker.scss';

const CustomDatePicker = ({ selected, onChange,...props }) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      showIcon
      dateFormat="dd/MM/yyyy"
      placeholderText="Due Date"
      isClearable={selected ? true : false}
      minDate={new Date()}
      {...props}
      style={{width:240}}
    />
  );
};

export default CustomDatePicker;
