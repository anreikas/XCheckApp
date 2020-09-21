import React, { useState, useEffect } from 'react';
import TasksTable from './TasksTable/TasksTable';
import TasksDescription from './TasksDescription/TasksDescription';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../Tasks/TasksReducer';


const Tasks = () => {

  const [isShowDescription, setShowDescription] = useState(false);
  const [showId, setShowId] = useState('');

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getTasks());
  },[getTasks]);

  const { tasks } = useSelector((state) => state.tasksReducer);

  if (!isShowDescription && tasks) {

    return <TasksTable tasks={tasks} setShowDescription={setShowDescription} setShowId={setShowId} />
    
  } else if (isShowDescription && tasks) {

    return <TasksDescription tasks={tasks} showId={showId} setShowDescription={setShowDescription} />

  } else {
    return <div>TASKS</div>;
  }
}

export default Tasks;
