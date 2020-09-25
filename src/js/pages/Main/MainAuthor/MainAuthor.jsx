import React, { useEffect, useState } from 'react';
import './MainAuthor.scss';
import { getTasksAuthor } from './MainAuthorReducer';
import { useDispatch, useSelector } from 'react-redux';
import AuthorTable from './TableAuthor/TableAuthor';
import CreateTask from './CreateTask/CreateTask';

const MainAuthor = ({author}) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasksAuthor(author));
  }, [getTasksAuthor]);
  const { tasksAuthor, tasks } = useSelector((state) => state.tasksAuthorReducer);
  console.log(tasksAuthor);
  console.log(tasks);

  const [createNewTask, setCreateNewTask] = useState(false);
  const [updateTask, setUpdateTask] = useState(false);

  // const openCreateTask = () => {
  //   setCreateNewTask(true);
  // }

  // const tasksAuthor = [
  //   {
  //     id: "simple-task-v1",
  //     author: "cardamo",
  //     state: "DRAFT", // enum [DRAFT, PUBLISHED, ARCHIVED]
  //     categoriesOrder: ["Basic Scope", "Extra Scope", "Fines"],
  //     items: [
  //       {
  //         id: "basic_p1",
  //         minScore: 0,
  //         maxScore: 20,
  //         category: "Basic Scope",
  //         title: "Basic things",
  //         description: "You need to make things right, not wrong"
  //       },
  //       {
  //         id: "extra_p1",
  //         minScore: 0,
  //         maxScore: 30,
  //         category: "Extra Scope",
  //         title: "More awesome things",
  //         description: "Be creative and make up some more awesome things"
  //       },
  //       {
  //         id: "fines_p1",
  //         minScore: -10,
  //         maxScore: 0,
  //         category: "Fines",
  //         title: "App crashes",
  //         description: "App causes BSoD!"
  //       }
  //     ]
  //   },{
  //     id: "simple-task-v2",
  //     author: "cardamo",
  //     state: "PUBLISHED", // enum [DRAFT, PUBLISHED, ARCHIVED]
  //     categoriesOrder: ["Basic Scope", "Extra Scope", "Fines"],
  //     items: [
  //       {
  //         id: "basic_p1",
  //         minScore: 0,
  //         maxScore: 30,
  //         category: "Basic Scope",
  //         title: "Basic things",
  //         description: "You need to make things right, not wrong"
  //       },
  //       {
  //         id: "extra_p1",
  //         minScore: 0,
  //         maxScore: 30,
  //         category: "Extra Scope",
  //         title: "More awesome things",
  //         description: "Be creative and make up some more awesome things"
  //       },
  //       {
  //         id: "fines_p1",
  //         minScore: -10,
  //         maxScore: 0,
  //         category: "Fines",
  //         title: "App crashes",
  //         description: "App causes BSoD!"
  //       }
  //     ]
  //   }
  // ]

  return (
    createNewTask || updateTask
    ?(<CreateTask createNewTask={createNewTask}
                  author={author}
                  updateTask={updateTask}
                  tasksAuthor={tasksAuthor}
                  tasks={tasks}
                  setCreateNewTask={setCreateNewTask}
                  setUpdateTask={setUpdateTask} />)
    :(<AuthorTable tasksAuthor={tasksAuthor}
                   setCreateNewTask={setCreateNewTask}
                   setUpdateTask={setUpdateTask}
                   author={author} />)
   
  )
}

export default MainAuthor;
