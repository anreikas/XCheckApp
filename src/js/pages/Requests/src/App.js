import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { task as taskData } from './data';
import Table from './table';
import { reviewRequests, tasksAPI } from '../../../utils';
import TaskCheck from './task-check';

export default function App() {
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    const getTasks = async () => {
      const gTasks = await tasksAPI.getTasks();

      setTasks(
        gTasks.map((el) => ({
          ...el,
          key: el.id,
        })),
      );
    };

    getTasks();
  }, []);

  useEffect(() => {
    console.log('tasks', tasks);
  }, [tasks]);

  const Tasks = taskData.map(({ id }) => <option key={id}>{id}</option>);

  const optionChange = useCallback(async (e) => {
    if (e.target.value !== '--выберите Task--') {
      const taskId = e.target.value;
      const pickedTask = await reviewRequests.getTask(taskId);
      setTask(pickedTask);
    } else {
      setTask(null);
    }
  }, []);

  const onRowClick = useCallback(async (record) => {
    const {task} = record;
    const gTask = await reviewRequests.getTask(task);

    console.log( '@ : ', gTask );

    if (gTask) {
      setTask(gTask);
      setShow(true);
    }

  }); // , [input]

  const submit = () => {
    handleClose()
    setShowTable(true)
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
            {tasks.map(({ id }) => <option key={id}>{id}</option>)}
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
        /> : null}
    </div>
    <div className="container mt-5" style={tableDisplay}>
      <Table/>
    </div>

  </>)

}
