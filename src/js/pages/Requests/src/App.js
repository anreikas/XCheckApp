import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import Table from './table';
import TaskCheck from './task-check/index';
import { getTasks, createRequest } from './actions';
import { REQUESTS_TABLE_TYPES, STATES } from '../../../constants';

export default function App({ user: { nickname } }) {
  const AUTHOR = nickname;
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [taskCheck, setTaskCheck] = useState(null);
  const [updateDrafted, setUpdateDrafted] = useState(false);
  const [updatePublished, setUpdatePublished] = useState(false);
  const handleClose = () => {
    setTaskCheck(null);
  };

  const optionChange = useCallback(({ target: { value } }) => {
    setSelectedTaskId(value === '--выберите Task--' ? '' : value);
  }, []);

  const showTaskCheck = useCallback((type, request) => {
    setTaskCheck(
      <TaskCheck
        show={true}
        type={type}
        handleClose={handleClose}
        author={AUTHOR}
        request={request}
        onSend={() => {
          setUpdateDrafted(true);
          setUpdatePublished(true);
        }}
      />,
    );
  }, [AUTHOR]);

  const handleShow = useCallback(async (e) => {
    e.preventDefault();
    const newRequest = await createRequest(selectedTaskId, AUTHOR, STATES.DRAFT);

    showTaskCheck(REQUESTS_TABLE_TYPES.DRAFTED_REQUESTS, newRequest);
  }, [selectedTaskId, AUTHOR, showTaskCheck]);

  const onUpdate = useCallback(() => {
    setUpdateDrafted(false);
    setUpdatePublished(false);
  }, []);

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
    <div className="container mt-5">
      <Table
        title={() => <div className="table-title"><span>My saved requests</span></div>}
        filter={{ author: AUTHOR, state: STATES.DRAFT }}
        onClick={showTaskCheck.bind(null, REQUESTS_TABLE_TYPES.DRAFTED_REQUESTS)}
        update={updateDrafted}
        onUpdate={onUpdate}
      />
    </div>
    <div className="container mt-5">
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
