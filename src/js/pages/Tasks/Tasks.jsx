import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TasksTable from './TasksTable/TasksTable';
import TasksDescription from './TasksDescription/TasksDescription';
import { getTasks } from '../Tasks/TasksReducer';

const Tasks = () => {
  const [isShowDescription, setShowDescription] = useState(false);
  const [showId, setShowId] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [getTasks]);

  const { tasks } = useSelector((state) => state.tasksReducer);

  if (!isShowDescription && tasks) {
    return <TasksTable
      tasks={tasks}
      setShowDescription={setShowDescription}
      setShowId={setShowId}
    />;
  } if (isShowDescription && tasks) {
    return <TasksDescription
      tasks={tasks}
      showId={showId}
      setShowDescription={setShowDescription}
    />;
  }
  return <div>TASKS</div>;
};

export default Tasks;
