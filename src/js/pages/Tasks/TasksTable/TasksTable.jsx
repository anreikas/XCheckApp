import React, { useState } from 'react';
import './TasksTable.scss';
import DescriptionTable from './DescriptionTable/DescriptionTable';
import Select from '../../../components/Select/Select';
import Pagination from '../../../components/Pagination/Pagination';
import TableHead from './TableHead/TableHead';

const TasksTable = ({tasks, setShowDescription, setShowId}) => {

  const [dataTable, setDataTable] = useState(tasks);

  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = dataTable.slice(indexOfFirstTask, indexOfLastTask);
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

  return (
    <div className='tasks'>
      <table className='tasks__table'>
        <caption className='tasks__table-caption'>TASKS</caption>
        <thead className='tasks__table__header'>
          <TableHead setDataTable={setDataTable} tasks={tasks} />
        </thead>
        <tbody>
          {getTasks}
        </tbody>
      </table>
      <div className='tasks-control'>
        <Select setPerPage={setTasksPerPage} arr={[5,10,20,50,100]} />
        <Pagination
          elementsPerPage={tasksPerPage}
          totalElements={dataTable.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default TasksTable;
