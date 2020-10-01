import React, { useEffect, useState } from 'react';
import { tasksAPI } from '../../../../../utils';
import './SubmitTask.scss';

const SubmitTask = ({
  closeCreateTask, updateTask, createNewTask, nTask, tasks, setUpdateFl,
}) => {
  const [isSubmit, setIsSubmit] = useState('');

  const cloneTask = JSON.parse(JSON.stringify(nTask));
  /* eslint-disable no-param-reassign */
  nTask.score = cloneTask.items.map((item) => +item.maxScore).reduce((a, b) => a + b);

  const onSubmitTask = async () => {
    await tasksAPI.saveTask(nTask);
    setUpdateFl(true);
    setIsSubmit('');
    closeCreateTask();
  };
  const onUpdateTask = async () => {
    await tasksAPI.updateTask(nTask.id, nTask);
    setUpdateFl(true);
    setIsSubmit('');
    closeCreateTask();
  };
  useEffect(() => {
    if (isSubmit === 'save' && createNewTask) {
      onSubmitTask();
    }
    if (isSubmit === 'update' && updateTask) {
      onUpdateTask();
    }
  });
  const onSubmit = () => {
    const isTaskName = tasks.map((el) => el.id).includes(nTask.id);
    if (nTask.id && !isTaskName && createNewTask) {
      setIsSubmit('save');
    } else if (nTask.id && updateTask) {
      setIsSubmit('update');
    }
  };
  return (
    <div>
      <button onClick={onSubmit}>submit</button>
    </div>
  );
};

export default SubmitTask;
