import React, { useEffect, useState } from 'react';
import { tasksAPI } from '../../../../../utils';
import './SubmitTask.scss';

const SubmitTask = ({closeCreateTask, updateTask, createNewTask, nTask, tasks}) => {
  const [isSubmit, setIsSubmit] = useState('');

  const cloneTask = JSON.parse(JSON.stringify(nTask));

  nTask.score = cloneTask.items.map(item => +item.maxScore).reduce((a,b) => a + b);

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
    if(nTask.id && !isTaskName && createNewTask) {
      setIsSubmit('save');
      console.log(nTask);
    } else if (nTask.id && updateTask) {
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
