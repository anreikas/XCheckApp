import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import Table from './table';
import TaskCheck from './task-check';
import { getTasks, getTaskById, createRequest, sendRequest } from './actions';
import { REQUESTS_TABLE_TYPES } from '../../../constants';

const AUTHOR = 'rgovin';
const STATES = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
};
// const TABLE_TYPES = {
//   PUBLISHED_REVIEWS: 'REVIEWS',
//   SAVED_REQUESTS: 'SAVED_REQUESTS',
// };

export default function App() {
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskCheckType, setTaskCheckType] = useState(REQUESTS_TABLE_TYPES.PUBLISHED_REVIEWS);
  const [show, setShow] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [showTable, setShowTable] = useState(true);
  const [taskCheck, setTaskCheck] = useState(null);

  const handleClose = () => {
    setTaskCheck(null);
  };

  const saveRequest = useCallback(async (request, checkFormData) => {

  });

  const sendRequest = useCallback((checkFormData) => {

  });

  const optionChange = useCallback(({ target: { value } }) => {
    setSelectedTaskId(value === '--выберите Task--' ? '' : value);
  }, []);

  const showTaskCheck = useCallback((type, request) => {
    console.log( '@ : showTaskCheck, ', type, request);
    setTaskCheck(
      <TaskCheck
        show={true}
        type={type}
        save={saveRequest}
        send={sendRequest}
        handleClose={handleClose}
        request={request}
      />,
    );
  }, []);

  const handleShow = useCallback( async (e) => {
    e.preventDefault();
    const newRequest = await createRequest(selectedTaskId, AUTHOR, STATES.DRAFT);

    showTaskCheck(REQUESTS_TABLE_TYPES.DRAFTED_REQUESTS, newRequest);
  }, [selectedTaskId]);

  const onRowClick = useCallback((type, record) => {
    const { task: taskId } = record;

    // getTaskById(taskId, (gTask) => {
    //   setTask(gTask);
    //   setShow(true);
    // });
    /*
    <div className="container">
      {task
        ? <Button variant="primary mt-1" onClick={handleShow}>Проверить {task.id}</Button>
        : null}
    </div>
*/
    getTaskById(taskId, showTaskCheck.bind(null, type));
  });

  const tableDisplay = {
    display: showTable ? 'block' : 'none'
  }

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  useEffect(() => {
    console.log('tasks', tasks);
  }, [tasks]);

  return (<>
    <div className="container mt-5">
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Выберите Task</Form.Label>
          <Form.Control as="select" custom onChange={optionChange}>
            <option>--выберите Task--</option>
            {tasks.map(({ id }) => <option key={id}>{id}</option>)}
          </Form.Control>
        </Form.Group>
        {selectedTaskId
          ? <Button
            variant="primary mt-1"
            type="submit"
            onClick={handleShow}
          >
            Проверить {selectedTaskId}
          </Button>
          : null}
      </Form>
    </div>
    <div className="container">
      {taskCheck}
    </div>
    <div className="container mt-5" style={tableDisplay}>
      <Table
        title={() => <div className="table-title"><span>My saved requests</span></div>}
        filter={{ author: AUTHOR, state: STATES.DRAFT }}
        onClick={showTaskCheck.bind(null, REQUESTS_TABLE_TYPES.DRAFTED_REQUESTS)}
      />
    </div>
    <div className="container mt-5" style={tableDisplay}>
      <Table
        title={() => <div className="table-title"><span>Published requests</span></div>}
        onClick={showTaskCheck.bind(null, REQUESTS_TABLE_TYPES.PUBLISHED_REVIEWS)}
        filter={{ state: STATES.PUBLISHED }}
      />
    </div>
  </>);
}
