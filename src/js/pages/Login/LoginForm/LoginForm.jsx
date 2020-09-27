import React from 'react';
import './LoginForm.scss';

const LoginForm = () => {

  const onRoleChoice = (e) => {
    localStorage.setItem('role', e.currentTarget.value);
  }

  return (
    <div className='login-form'>
      <h2 className='login-form-h2'>Choose role:</h2>
      <div className='login-form__wrapper'>
        <div className='login-form__wrapper__elem'>
          <input type='radio' id='roleChoice1' name='role' value='Student' defaultChecked onClick={onRoleChoice}/>
          <label htmlFor='roleChoice1'>Student</label>
        </div>
        <div className='login-form__wrapper__elem'>
          <input type='radio' id='roleChoice2' name='role' value='Mentor' onClick={onRoleChoice}/>
          <label htmlFor='roleChoice2'>Mentor</label>
        </div>
        <div className='login-form__wrapper__elem'>
          <input type='radio' id='roleChoice3' name='role' value='Author' onClick={onRoleChoice}/>
          <label htmlFor='roleChoice3'>Author</label>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;
