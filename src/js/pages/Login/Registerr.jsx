// import React, { useState } from 'react';
// import { compose } from 'redux';
// import { withRouter } from 'react-router-dom';
// // dev-70tp5vfu.eu.auth0.com
// // Qm4mlgGlB2i76srperCU1HSulqES8PU0
// const Register = ({history}) => {
//   const initialFormState = {login: '', password: '', confirm: ''}
//   const [user, setUser] = useState(initialFormState);

//   const handleInputChange = event => {
//     const { name, value } = event.currentTarget
//     // console.log(name, value);
//     setUser({ ...user, [name]: value })
//   }
//   const handleSubmit = e => {
//     e.preventDefault();
//     if (user.password === user.confirm) {
//       const serialObj = JSON.stringify(user)
//       localStorage.setItem('user', serialObj);
//       history.push('/login');
//     } else (console.log('error'));
    
//   }
//   return (
//     <form onSubmit={handleSubmit} className='register'>
//       <div>
//         <input name="login" type="text" onChange={handleInputChange}/>
//       </div>
//       <div>
//         <input name="password" type="password" onChange={handleInputChange}/>
//       </div>
//       <div>
//         <input name="confirm" type="password" onChange={handleInputChange}/>
//       </div>
//       <button>register</button>
//     </form>
//   )
// }

// export default compose(withRouter)(Register);
