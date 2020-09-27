import React from 'react';
import './FormItemTask.scss';

const FormItemTask = ({category, title, minscore, maxscore, description, nTask, setNtask, el, item}) => {
  console.log(maxscore)
  return (
    <ul>
      <h4>{category}</h4>
      <li>
        <label>
          <div>title:</div>
          <input type="text"
                 value={title}
                 onChange={(e)=>setNtask({...nTask, items: nTask.items.map((elem,i)=> i === item
                                                           ?{...elem, title: e.target.value}
                                                           : {...elem})})}/>
        </label>
      </li>
      <li>
        <label>
          <div>minScore:</div>
          <input type="number"
                 value={minscore}
                 onChange={ (e)=>setNtask({ ...nTask, items: nTask.items.map((elem,i)=> i === item
                                                            ?{...elem, minScore: +e.target.value}
                                                            : {...elem}) }) } />
        </label>
      </li>
      <li>
        <label>
          <div>maxScore:</div>
          <input type="number"
                 value={maxscore}
                 onChange={(e)=>setNtask({...nTask, items: nTask.items.map((elem,i)=> i === item
                                                           ?{...elem, maxScore: +e.target.value}
                                                           : {...elem})})} />
        </label>
      </li>
      <li>
        <label>
          <div>description:</div>
          <textarea type="text"
                    value={description}
                    onChange={(e)=>setNtask({...nTask, items: nTask.items.map((elem,i)=> i === item
                                                              ?{...elem, description: e.target.value}
                                                              : {...elem})})} />
        </label>
      </li>
    </ul>
  )
}

export default FormItemTask;
