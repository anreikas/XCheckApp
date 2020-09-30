import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import Table from './table';
import TaskCheck from './task-check/index';
import { getTasks, getTaskById, createRequest } from './actions';
import { REQUESTS_TABLE_TYPES, STATES } from '../../../constants';

// const AUTHOR = 'rgovin';

// const TABLE_TYPES = {
//   PUBLISHED_REVIEWS: 'REVIEWS',
//   SAVED_REQUESTS: 'SAVED_REQUESTS',
// };

export default function App({ user }) {
  // TODO вернуть автора
  const AUTHOR = user.nickname;
  /* eslint-disable no-unused-vars */
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskCheckType, setTaskCheckType] = useState(REQUESTS_TABLE_TYPES.PUBLISHED_REQUESTS);
  const [show, setShow] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [showTable, setShowTable] = useState(true);
  const [taskCheck, setTaskCheck] = useState(null);
  const [updateDrafted, setUpdateDrafted] = useState(false);
  const [updatePublished, setUpdatePublished] = useState(false);
  const handleClose = () => {
    /* eslint-disable no-console */
    console.log('@handleClose : ');
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
    setTaskCheck(
      <TaskCheck
        show={true}
        type={type}
        save={saveRequest}
        send={sendRequest}
        handleClose={handleClose}
        author={AUTHOR}
        request={request}
        onSend={({ state }) => {
          setUpdateDrafted(true);
          setUpdatePublished(true);
        }}
      />,
    );
  }, [AUTHOR, saveRequest, sendRequest]);

  const handleShow = useCallback(async (e) => {
    e.preventDefault();
    const newRequest = await createRequest(selectedTaskId, AUTHOR, STATES.DRAFT);

    showTaskCheck(REQUESTS_TABLE_TYPES.DRAFTED_REQUESTS, newRequest);
  }, [selectedTaskId, AUTHOR, showTaskCheck]);

  const onUpdate = useCallback(() => {
    setUpdateDrafted(false);
    setUpdatePublished(false);
  });

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
    display: showTable ? 'block' : 'none',
  };

  useEffect(() => {
    getTasks(setTasks);
  }, []);

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
        update={updateDrafted}
        onUpdate={onUpdate}
      />
    </div>
    <div className="container mt-5" style={tableDisplay}>
      <Table
        title={() => <div className="table-title"><span>Published requests</span></div>}
        onClick={showTaskCheck.bind(null, REQUESTS_TABLE_TYPES.PUBLISHED_REQUESTS)}
        filter={{ state: STATES.PUBLISHED }}
        update={updatePublished}
        onUpdate={onUpdate}
      />
    </div>
  </>);
}
