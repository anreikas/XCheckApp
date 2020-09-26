import React,{useEffect, useState} from 'react';
import './App.css';
import 'antd/dist/antd.css';
// import {task as taskData} from './data'
import {Form,Button} from 'react-bootstrap'
import Table from './table'
import 'bootstrap/dist/css/bootstrap.min.css';

import {reviewRequests} from './../../../utils/index.js'

import TaskCheck from './task-check'

export default function App({props}) {

  const [taskData, setTaskData] = useState([]);

  const [task, setTask] = useState(null)
  const [show, setShow] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let tasks = taskData.map(({id})=>{
    return <option key={id}>{id}</option>
  })



  useEffect(() => {
    reviewRequests.getTask().then((body)=>setTaskData(body))
    // reviewRequests.getRequests().then((body)=>setTaskData(body))
  },[reviewRequests])
  

  function optionChange(e){
    if(e.target.value !== '--выберите Task--') {
      let obj = taskData.filter( el => el.id === e.target.value)
      setTask(obj[0])
      console.log(task)
    }else{
      setTask(null)
    }
    
  }

  const submit = () => {
    handleClose()
  }
  

  const tableDisplay = {
    display: showTable ? 'block' : 'none'
  }

  return  (<>
    <div className="container mt-5">
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Выберите Task</Form.Label>
          <Form.Control as="select" custom onChange={optionChange}>
            <option>--выберите Task--</option>
            {tasks}
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
    <div className="container">
      {task ?  
      <Button variant="primary mt-1" onClick={handleShow}>Проверить {task.id}</Button> 
      : null}
    </div>
    <div className="container">
        {task ? 
        <TaskCheck
        show={show}
        handleClose={submit}
        task={task}
        name={props.user.nickname}
        finalSubmit={()=>setShowTable(true)}
        /> : null}
    </div>
    <div className="container mt-5" style={tableDisplay}>
      <Table/>
    </div>
    
  </>)

}