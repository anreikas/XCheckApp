import React, { useEffect, useState } from 'react';
import { tasksAPI } from '../../../utils';
import './MainStudent.scss';

const MainStudent = () => {
  const [tasks, setTasks] = useState(0);

  const countTasks = async () => {
    const data = await tasksAPI.getTasks();
    setTasks(data.length);
  };

  useEffect(() => {
    countTasks();
  });

  return (
    <div className='stats'>
      <h2 className='stats-title'>Your stats</h2>
      <div className='stats__wrapper'>
        <div className='stats__wrapper__elem'>
          <h3 className='stats__wrapper__elem-title'>Score Points</h3>
          <span className='stats__wrapper__elem-val'>0</span>
        </div>
        <div className='stats__wrapper__elem'>
          <h3 className='stats__wrapper__elem-title'>Completed Tasks</h3>
          <span className='stats__wrapper__elem-val'>{`0/${tasks}`}</span>
        </div>
      </div>
    </div>
  );
};

export default MainStudent;
