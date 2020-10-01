/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PopupWindow from './PopupWindow/PopupWindow';
import SortControl from './SortControl/SortControl';
import './TableHead.scss';

const TableHead = ({ tasks, setDataTable }) => {
  const [sortFlag, setSortFlag] = useState('');
  const [isSortTasks, setIsSortTasks] = useState('');
  const [isSortAuthor, setIsSortAuthor] = useState('');
  const [authorTasks, setAuthorTasks] = useState(tasks);

  const sortTasksUp = (arr) => {
    setSortFlag('false');
    setIsSortAuthor('false');
    setAuthorTasks(arr);
    const newArr = JSON.parse(JSON.stringify(arr));
    setDataTable(newArr.sort((a, b) => (a.id > b.id ? 1 : -1)));
  };
  const sortTasksDown = (arr) => {
    setSortFlag('false');
    setIsSortAuthor('false');
    setAuthorTasks(arr);
    const newArr = JSON.parse(JSON.stringify(arr));
    setDataTable(newArr.sort((a, b) => (a.id > b.id ? -1 : 1)));
  };
  const sortAuthorUp = (arr) => {
    setSortFlag('false');
    setIsSortTasks('false');
    setAuthorTasks(arr);
    const newArr = JSON.parse(JSON.stringify(arr));
    setDataTable(newArr.sort((a, b) => (a.author > b.author ? 1 : -1)));
  };
  const sortAuthorDown = (arr) => {
    setSortFlag('false');
    setIsSortTasks('false');
    setAuthorTasks(arr);
    const newArr = JSON.parse(JSON.stringify(arr));
    setDataTable(newArr.sort((a, b) => (a.author > b.author ? -1 : 1)));
  };
  const sortScoreUp = (arr) => {
    setIsSortAuthor('false');
    setIsSortTasks('false');
    const newArr = JSON.parse(JSON.stringify(arr));
    setDataTable(newArr.sort((a, b) => (a.items.map((item) => item.maxScore)
      .reduce((a, b) => a + b) > b.items.map((item) => item.maxScore)
      .reduce((a, b) => a + b) ? 1 : -1)));
  };
  const sortScoreDown = (arr) => {
    setIsSortAuthor('false');
    setIsSortTasks('false');
    const newArr = JSON.parse(JSON.stringify(arr));
    setDataTable(newArr.sort((a, b) => (a.items.map((item) => item.maxScore)
      .reduce((a, b) => a + b) > b.items.map((item) => item.maxScore)
      .reduce((a, b) => a + b) ? -1 : 1)));
  };
  const searchTask = (value) => {
    const newArr = JSON.parse(JSON.stringify(tasks));
    setDataTable(newArr.filter((el) => el.id === value));
  };
  const searchAuthor = (value) => {
    let newArr = JSON.parse(JSON.stringify(tasks));
    newArr = newArr.filter((el) => el.author === value);
    setAuthorTasks(newArr);
    setDataTable(newArr);
  };

  const [isSearchTask, setIsSearchTask] = useState(false);
  const [isSearchAuthor, setIsSearchAuthor] = useState(false);
  const handleSearchTask = () => {
    if (isSearchTask) {
      setIsSearchTask(false);
    } else {
      setIsSearchTask(true);
      setIsSearchAuthor(false);
    }
  };
  const handleSearchAuthor = () => {
    if (isSearchAuthor) {
      setIsSearchAuthor(false);
    } else {
      setIsSearchAuthor(true);
      setIsSearchTask(false);
    }
  };

  const handleReset = () => {
    setSortFlag('');
    setAuthorTasks(tasks);
    setIsSortTasks('');
    setIsSortAuthor('');
    setDataTable(tasks);
  };

  return (
    <tr>
      <th className='tasks__table__header-item'>
        <div className='tasks__table__header-item__wrap'>
          <span>Task</span>
          <SortControl isSort={isSortTasks}
                       setIsSort={setIsSortTasks}
                       sortUp={sortTasksUp}
                       sortDown={sortTasksDown}
                       tasks={tasks} />
          <div className='tasks__table__header__search'>
            <span className='tasks__table__header-loupe' onClick={handleSearchTask}>
              &#9906;
            </span>
          </div>
        </div>
        <PopupWindow searchFlag={isSearchTask}
                     setSearchFlag={setIsSearchTask}
                     sortName={searchTask}
                     placehold='Search task-name' />
      </th>
      <th className='tasks__table__header-item'>
        <div className='tasks__table__header-item__wrap'>
          <span>Author</span>
          <SortControl isSort={isSortAuthor}
                       setIsSort={setIsSortAuthor}
                       sortUp={sortAuthorUp}
                       sortDown={sortAuthorDown}
                       tasks={tasks} />
          <div className='tasks__table__header__search'>
            <span className='tasks__table__header-loupe' onClick={handleSearchAuthor}>
              &#9906;
            </span>
          </div>
        </div>
        <PopupWindow searchFlag={isSearchAuthor}
                     setSearchFlag={setIsSearchAuthor}
                     sortName={searchAuthor}
                     placehold='Search author' />

      </th>
      <th className='tasks__table__header-item'>
        <div className='tasks__table__header-item__wrap'>
          <span>Max score</span>
          <SortControl isSort={sortFlag}
                       setIsSort={setSortFlag}
                       sortUp={sortScoreUp}
                       sortDown={sortScoreDown}
                       tasks={authorTasks} />
        </div>
      </th>
      <th className='tasks__table__header-item'>
        <button className='tasks__table__header-bth' onClick={handleReset}>RESET</button>
      </th>
    </tr>
  );
};

export default TableHead;
