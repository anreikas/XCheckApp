import React from 'react';
import './FormItemTask.scss';

const FormItemTask = ({ title, minscore, maxscore, description, nTask, setNtask, id}) => {
  console.log(maxscore)
  return (
    <ul>
      <li>
        <label>
          <div>title:</div>
          <input type="text"
                 value={title}
                 onChange={(e)=>setNtask({...nTask, items: nTask.items.map((elem,i)=> elem.id === id
                                                           ?{...elem, title: e.target.value}
                                                           : {...elem})})}/>
        </label>
      </li>
      <li>
        <label>
          <div>minScore:</div>
          <input type="number"
                 value={minscore}
                 onChange={ (e)=>setNtask({ ...nTask, items: nTask.items.map((elem,i)=> elem.id === id
                                                            ?{...elem, minScore: +e.target.value}
                                                            : {...elem}) }) } />
        </label>
      </li>
      <li>
        <label>
          <div>maxScore:</div>
          <input type="number"
                 value={maxscore}
                 onChange={(e)=>setNtask({...nTask, items: nTask.items.map((elem,i)=> elem.id === id
                                                           ?{...elem, maxScore: +e.target.value}
                                                           : {...elem})})} />
        </label>
      </li>
      <li>
        <label>
          <div>description:</div>
          <textarea type="text"
                    value={description}
                    onChange={(e)=>setNtask({...nTask, items: nTask.items.map((elem,i)=> elem.id === id
                                                              ?{...elem, description: e.target.value}
                                                              : {...elem})})} />
        </label>
      </li>
    </ul>
  )
}

export default FormItemTask;
