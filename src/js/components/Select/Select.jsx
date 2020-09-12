import React from 'react';

const Select = ({onChangeSelect, arr}) => {
  const options = arr.map(el => <option key={`${el}`} value={`${el}`}>{el}</option>);
  return (
    <div>
      <span>output: </span>
      <select onChange={onChangeSelect}>
        {options}
      </select>
    </div>
  )
}

export default Select;
