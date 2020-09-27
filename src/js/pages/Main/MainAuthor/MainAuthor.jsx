import React, { useEffect, useState } from 'react';
import './MainAuthor.scss';
import { getTasksAuthor } from './MainAuthorReducer';
import { useDispatch, useSelector } from 'react-redux';
import AuthorTable from './TableAuthor/TableAuthor';
import CreateTask from './CreateTask/CreateTask';

const MainAuthor = ({author}) => {

  const [createNewTask, setCreateNewTask] = useState(false);
  const [updateTask, setUpdateTask] = useState(false);
  const [taskId, setTaskId] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasksAuthor(author));
  }, [getTasksAuthor]);
  const { tasksAuthor, tasks } = useSelector((state) => state.tasksAuthorReducer);

  return (
    createNewTask || updateTask
    ?(<CreateTask createNewTask={createNewTask}
                  author={author}
                  updateTask={updateTask}
                  tasksAuthor={tasksAuthor}
                  tasks={tasks}
                  setCreateNewTask={setCreateNewTask}
                  setUpdateTask={setUpdateTask}
                  taskId={taskId} />)
    :(<AuthorTable tasksAuthor={tasksAuthor}
                   setCreateNewTask={setCreateNewTask}
                   setUpdateTask={setUpdateTask}
                   author={author}
                   setTaskId={setTaskId} />)
   
  )
}

export default MainAuthor;
