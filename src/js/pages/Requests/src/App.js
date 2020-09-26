import React, { useState, useCallback } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { task as taskData } from './data';
import Table from './table';

import TaskCheck from './task-check';

export default function App() {
  const [task, setTask] = useState(null);
  const [show, setShow] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {

    setShow(true);
  }

  const tasks = taskData.map(({ id }) => <option key={id}>{id}</option>);

  function optionChange(e) {
    if (e.target.value !== '--выберите Task--') {
      const obj = taskData.filter((el) => el.id === e.target.value);
      setTask(obj[0]);
      console.log(task);
    } else {
      setTask(null);
    }
  }

  const onRowClick = useCallback((record) => {
    // console.log( '@ : ', record );
    setTask(record);
    setShow(true);
  }); // , [input]

  const submit = () => {
    handleClose();
    setShowTable(true);
  };

  const tableDisplay = {
    display: showTable ? 'block' : 'none',
  };

  return (<>
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
      {task
        ? <Button variant="primary mt-1" onClick={handleShow}>Проверить {task.id}</Button>
        : null}
    </div>
    <div className="container">
      {task
        ? <TaskCheck
          show={show}
          handleClose={submit}
          task={task}
        />
        : null}
    </div>
    <div className="container mt-5" style={tableDisplay}>
      <Table onClick={onRowClick}/>
    </div>

  </>);
}
