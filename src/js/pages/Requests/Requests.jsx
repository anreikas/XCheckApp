import React from 'react';
import './Requests.scss';
import REQUESTS from './src/App';

const Requests = ({user}) => (
  <div>
    <REQUESTS user={user}/>
  </div>
);

export default Requests;
