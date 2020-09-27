import React, { useEffect, useState } from 'react';
import { tasksAPI } from '../../../../../utils';
import './SubmitTask.scss';

const SubmitTask = ({closeCreateTask, updateTask, createNewTask, nTask, tasks}) => {
  const [isSubmit, setIsSubmit] = useState('');
<<<<<<< HEAD
=======

  const cloneTask = JSON.parse(JSON.stringify(nTask));

  nTask.score = cloneTask.items.map(item => +item.maxScore).reduce((a,b) => a + b);
>>>>>>> 672e8c55492ac18c04f9bc265fde009971d90ed3
  
  const onSubmitTask = async() => {
    await tasksAPI.saveTask(nTask);
    setIsSubmit('');
    closeCreateTask();
  }
  const onUpdateTask = async() => {
    await tasksAPI.updateTask(nTask.id, nTask);
    setIsSubmit('');
    closeCreateTask();
  }
  useEffect(() => {
    if(isSubmit === 'save' && createNewTask) {
      onSubmitTask();
    }
    if(isSubmit === 'update' && updateTask) {
      onUpdateTask();
    }
  })
  const onSubmit = () => {
    const isTaskName = tasks.map(el => el.id).includes(nTask.id);
<<<<<<< HEAD
    if(nTask.id && !isTaskName) {
      setIsSubmit('save');
      console.log(nTask);
    } else if (nTask.id) {
=======
    if(nTask.id && !isTaskName && createNewTask) {
      setIsSubmit('save');
      console.log(nTask);
    } else if (nTask.id && updateTask) {
>>>>>>> 672e8c55492ac18c04f9bc265fde009971d90ed3
      setIsSubmit('update');
    }
  }
  return (
    <div>
      <button onClick={onSubmit}>submit</button>
    </div>
  )
}

export default SubmitTask;
