import React, { useState } from 'react';
import './TasksDescription.scss';
import ElementsDescription from './ElementsDescription/ElementsDescription';

const TasksDescription = ({tasks, showId, setShowDescription}) => {
  const [taskShow] = tasks.map(el => el.id === showId && el).filter(n => n);

  const maxPoint = taskShow.items.map(item => item.maxScore).reduce((a, b) => a + b);

  const categories = taskShow.categoriesOrder.map((el, i) => <div key={i}>
    <ul>
      <li>{el}</li>
      <ElementsDescription taskShow={taskShow.items} category={el} />
    </ul>
  </div>);

  return (
    <div className='task-description'>
      <h2 className='task-description-header'>{taskShow.id}</h2>
      <p>{taskShow.shortDescription}</p>
      <h3>Evaluation</h3>
      <hr/>
      <span>Maximum amount of points - {maxPoint}</span>
      {categories}
      <button className='task-description-bth' onClick={()=> setShowDescription(false)}>BACK</button>
    </div>
    
  )
}

export default TasksDescription;
