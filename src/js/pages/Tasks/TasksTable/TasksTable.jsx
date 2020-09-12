import React, { useState } from 'react';
import '../Tasks.scss';
import DescriptionTable from './DescriptionTable/DescriptionTable';
import Select from '../../../components/Select/Select';
import Pagination from '../../../components/Pagination/Pagination';

const TasksTable = ({tasks, setShowDescription, setShowId}) => {


  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(1);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const getTasks = currentTasks.map(el => {
    const maxScore = el.items.map(item => item.maxScore).reduce((a,b) => a + b);
    return <DescriptionTable key={el.id}
                             id={el.id}
                             author={el.author}
                             maxScore={maxScore}
                             setShowDescription={setShowDescription}
                             setShowId={setShowId} />
  });

  const onChangeSelect = (e) => {
    setTasksPerPage(e.target.value);
  }

  return (
    <div className='tasks'>
      <table className='tasks__table'>
        <caption className='tasks__table-caption'>TASKS</caption>
        <thead className='tasks__table__header'>
          <tr>
            <th>task</th>
            <th>author</th>
            <th>max score</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getTasks}
        </tbody>
      </table>
      <div className='tasks-control'>
        <Select onChangeSelect={onChangeSelect} arr={[1,5,10,20,50,100]} />
        <Pagination
          elementsPerPage={tasksPerPage}
          totalElements={tasks.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default TasksTable;
