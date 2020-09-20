import React, { useState } from 'react';
import PopupWindow from './PopupWindow/PopupWindow';
import './TableHead.scss';

const TableHead = ({tasks, setDataTable}) => {

  const [sortFlag, setSortFlag] = useState(false);

  const sortTask = (value) => {
    let newArr = JSON.parse(JSON.stringify(tasks));
    setDataTable(newArr.filter(el => el.id === value));
  }
  const sortAuthor = (value) => {
    let newArr = JSON.parse(JSON.stringify(tasks));
    setDataTable(newArr.filter(el => el.author === value));
  }
  const sortScoreUp = (arr) => {
    let newArr = JSON.parse(JSON.stringify(arr));
    return newArr.sort((a, b) => a.items.map(item => item.maxScore)
    .reduce((a, b) => a + b) > b.items.map(item => item.maxScore)
    .reduce((a, b) => a + b) ? 1 : -1);
  }
  const sortScoreDown = (arr) => {
    let newArr = JSON.parse(JSON.stringify(arr));
    return newArr.sort((a, b) => a.items.map(item => item.maxScore)
    .reduce((a, b) => a + b) > b.items.map(item => item.maxScore)
    .reduce((a, b) => a + b) ? -1 : 1);
  }

  const [isSearchTask, setIsSearchTask] = useState(false);
  const [isSearchAuthor, setIsSearchAuthor] = useState(false);
  const handleSearchTask = () => {
    if(isSearchTask) {
      setIsSearchTask(false);
    } else {
      setIsSearchTask(true);
      setIsSearchAuthor(false);
    }
  }
  const handleSearchAuthor = () => {
    if(isSearchAuthor) {
      setIsSearchAuthor(false);
    } else {
      setIsSearchAuthor(true);
      setIsSearchTask(false);
    }
  }

  return (
    <tr>
      <th className='tasks__table__header-item'>task
        <PopupWindow searchFlag={isSearchTask} setSearchFlag={setIsSearchTask} sortName={sortTask} />
        <span className='tasks__table__header-loupe' onClick={handleSearchTask}>
        &#9906;
        </span>
      </th>
      <th className='tasks__table__header-item'>author
        <PopupWindow searchFlag={isSearchAuthor} setSearchFlag={setIsSearchAuthor} sortName={sortAuthor} />
        <span className='tasks__table__header-loupe' onClick={handleSearchAuthor}>
        &#9906;
        </span>
      </th>
      <th onClick={() => {
        if (sortFlag) {
          setSortFlag(false);
          setDataTable(sortScoreUp(tasks));
        } else {
          setSortFlag(true);
          setDataTable(sortScoreDown(tasks));
        }
      }}  className='tasks__table__header-item'>max score 
        <div className='table__header-item__wrap'>
          <span>&#8743;</span><br/><span>&#8744;</span>
        </div>
      </th>
      <th className='tasks__table__header-item'>
        <button className='tasks__table__header-bth' onClick={()=> setDataTable(tasks)}>RESET</button>
      </th>
    </tr>
  )
}

export default TableHead;
