import React from 'react';
import './Select.scss';

const Select = ({setPerPage, arr}) => {
  const onChangeSelect = (e) => {
    setPerPage(e.target.value);
  }
  const options = arr.map(el => <option key={`${el}`} value={`${el}`}>{el}</option>);
  return (
    <div className='wrapper-select'>
      <span>output: </span>
      <select className='select' onChange={onChangeSelect}>
        {options}
      </select>
    </div>
  )
}

export default Select;
