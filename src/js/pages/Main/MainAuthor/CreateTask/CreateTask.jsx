import React, { useState } from 'react';
import './CreateTask.scss';
import FormItemTask from './FormItemTask/FormItemTask';
import SubmitTask from './SubmitTask/SubmitTask';

const CreateTask = ({ setUpdateTask,
                      setCreateNewTask,
                      createNewTask,
                      updateTask,
                      tasksAuthor,
                      author,
                      tasks,
                      taskId}) => {
  const task = updateTask
  ?JSON.parse(JSON.stringify(tasksAuthor)).find(el=> el.id === taskId)
  :{
    id: "",
    author: author,
    state: "DRAFT", // enum [DRAFT, PUBLISHED, ARCHIVED]
    categoriesOrder: ["Basic Scope", "Extra Scope", "Fines"],
    score: '',
    items: [
      {
        id: "basic_p1",
        minScore: '',
        maxScore: '',
        category: "Basic Scope",
        title: "",
        description: ""
      },
      {
        id: "extra_p1",
        minScore: '',
        maxScore: '',
        category: "Extra Scope",
        title: "",
        description: ""
      },
      {
        id: "fines_p1",
        minScore: '',
        maxScore: '',
        category: "Fines",
        title: "",
        description: ""
      }
    ]
  }
  
  const [nTask, setNtask] = useState(task);
  console.log(nTask);
  const closeCreateTask = () => {
    setUpdateTask(false);
    setCreateNewTask(false);
  }
  const addItem = (str) => {
    setNtask({...nTask, items: [...nTask.items, {id: `${str.split(' ').join('').toLowerCase()}${Date.now()}`, minScore: '', maxScore: '', category: str, title: '', description: ''}] })
  }
  return (
    <div className='manager'>
      <button onClick={closeCreateTask}>close</button>

      <div>
        <label>
          <div>Task-Name:</div>
          {createNewTask
          ?<input type="text" value={nTask.id} onChange={(e)=>setNtask({...nTask, id: e.target.value})}/>
          :<p>{nTask.id}</p>}
        </label><br/>
        <label>
          <div>state:</div>
          <select onChange={e=>setNtask({...nTask, state: e.target.value})} value={nTask.state}>
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </label>

        <div className='form-items'>
          <div className='form-item'>
            <h4>Basic Scope</h4>
            {nTask.items.map((el)=> el.category === 'Basic Scope'
                                    && <FormItemTask key={el.id}
                                    category={el.category}
                                    title={el.title}
                                    minscore={el.minScore}
                                    maxscore={el.maxScore}
                                    description={el.description}
                                    nTask={nTask}
                                    setNtask={setNtask}
                                    id={el.id} />)}
              <button onClick={() => addItem('Basic Scope')}>add</button>
          </div>
          <div className='form-item'>
            <h4>Extra Scope</h4>
            {nTask.items.map((el)=> el.category === 'Extra Scope'
                                    && <FormItemTask key={el.id}
                                    category={el.category}
                                    title={el.title}
                                    minscore={el.minScore}
                                    maxscore={el.maxScore}
                                    description={el.description}
                                    nTask={nTask}
                                    setNtask={setNtask}
                                    id={el.id} />)}
            <button onClick={() => addItem('Extra Scope')}>add</button>
          </div>
          <div className='form-item'>
            <h4>Fines</h4>
            {nTask.items.map((el)=> el.category === 'Fines'
                                    && <FormItemTask key={el.id}
                                    category={el.category}
                                    title={el.title}
                                    minscore={el.minScore}
                                    maxscore={el.maxScore}
                                    description={el.description}
                                    nTask={nTask}
                                    setNtask={setNtask}
                                    id={el.id} />)}
            <button onClick={() => addItem('Fines')}>add</button>
          </div>
        </div>
      </div>


      <SubmitTask closeCreateTask={closeCreateTask} createNewTask={createNewTask} updateTask={updateTask} setUpdateTask={setUpdateTask} nTask={nTask} tasks={tasks} />
    </div>
  )
}

export default CreateTask;
