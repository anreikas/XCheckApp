import React, { useState } from 'react';
import './PopupWindow.scss';

const PopupWindow = ({searchFlag, setSearchFlag, sortName}) => {
  const [imputValue, setInputValue] = useState('');
  const onInputChange = (e) => {
    setInputValue(e.currentTarget.value);
  }
  const onInputReset = () => {
    setInputValue('');
  }
  const handleSubmit = () => {
    sortName(imputValue);
    setSearchFlag(false);
  }
  return <div className={searchFlag ? 'task-popup': 'inactive'}>
    <input className='task-popup-input' type="text" onChange={onInputChange} value={imputValue}/>
    <div className='task-popup__buttons'>
      <button className='task-popup__buttons-search' onClick={handleSubmit}>Search</button>
      <button className='task-popup__buttons-reset' onClick={onInputReset} >Reset</button>
    </div>
  </div>
}

export default PopupWindow;
