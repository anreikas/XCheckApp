import React from 'react';
import './FormItemTask.scss';

<<<<<<< HEAD
const FormItemTask = ({category, title, minscore, maxscore, description, nTask, setNtask, el, item}) => {
  return (
    <ul>
      <h4>{category}</h4>
=======
const FormItemTask = ({ title, minscore, maxscore, description, nTask, setNtask, id}) => {
  console.log(maxscore)
  return (
    <ul>
>>>>>>> 672e8c55492ac18c04f9bc265fde009971d90ed3
      <li>
        <label>
          <div>title:</div>
          <input type="text"
                 value={title}
<<<<<<< HEAD
                 onChange={(e)=>setNtask({...nTask, items: nTask.items.map((elem,i)=> i === item
=======
                 onChange={(e)=>setNtask({...nTask, items: nTask.items.map((elem,i)=> elem.id === id
>>>>>>> 672e8c55492ac18c04f9bc265fde009971d90ed3
                                                           ?{...elem, title: e.target.value}
                                                           : {...elem})})}/>
        </label>
      </li>
      <li>
        <label>
          <div>minScore:</div>
          <input type="number"
                 value={minscore}
<<<<<<< HEAD
                 onChange={(e)=>setNtask({...nTask, items: nTask.items.map((elem,i)=> i === item
                                                            ?{...elem, minScore: +e.target.value}
                                                            : {...elem})})} />
=======
                 onChange={ (e)=>setNtask({ ...nTask, items: nTask.items.map((elem,i)=> elem.id === id
                                                            ?{...elem, minScore: +e.target.value}
                                                            : {...elem}) }) } />
>>>>>>> 672e8c55492ac18c04f9bc265fde009971d90ed3
        </label>
      </li>
      <li>
        <label>
          <div>maxScore:</div>
          <input type="number"
                 value={maxscore}
<<<<<<< HEAD
                 onChange={(e)=>setNtask({...nTask, items: nTask.items.map((elem,i)=> i === item
=======
                 onChange={(e)=>setNtask({...nTask, items: nTask.items.map((elem,i)=> elem.id === id
>>>>>>> 672e8c55492ac18c04f9bc265fde009971d90ed3
                                                           ?{...elem, maxScore: +e.target.value}
                                                           : {...elem})})} />
        </label>
      </li>
      <li>
        <label>
          <div>description:</div>
          <textarea type="text"
                    value={description}
<<<<<<< HEAD
                    onChange={(e)=>setNtask({...nTask, items: nTask.items.map((elem,i)=> i === item
=======
                    onChange={(e)=>setNtask({...nTask, items: nTask.items.map((elem,i)=> elem.id === id
>>>>>>> 672e8c55492ac18c04f9bc265fde009971d90ed3
                                                              ?{...elem, description: e.target.value}
                                                              : {...elem})})} />
        </label>
      </li>
    </ul>
  )
}

export default FormItemTask;
