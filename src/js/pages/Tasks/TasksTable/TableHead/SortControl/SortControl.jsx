import React from 'react';
import './SortControl.scss';

const SortControl = ({
  isSort, setIsSort, sortUp, sortDown, tasks,
}) => (
    <div className='sort-control' onClick={() => {
      if (isSort) {
        setIsSort(false);
        sortUp(tasks);
      } else {
        setIsSort(true);
        sortDown(tasks);
      }
    }}>
      <span className={isSort === true ? 'sort-control-active' : null}>&#9650;</span>
      <br/>
      <span className={isSort === false ? 'sort-control-active' : null}>&#9660;</span>
    </div>
);

export default SortControl;
