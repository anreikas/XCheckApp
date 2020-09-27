import React, { useState, useEffect, useCallback } from 'react';
import {
  Form, Button, Modal, Alert,
} from 'react-bootstrap';
import Range from '../range/index';
import { REQUESTS_TABLE_TYPES } from '../../../../constants';
import { getTasks, getTaskById, createCheckForm } from '../actions';
// import Form from '../form';

const ACTIONS = {
  SAVE: 'SAVE',
  SEND: 'SEND',
};

export default ({
  request, type, show, handleClose, save, send,
}) => {
  const [checkFormData, setCheckFormData] = useState({});
  const [checkForm, setCheckForm] = useState(null);
  const [score, setScore] = useState(0);
  const [isReset, setIsReset] = useState(false);
  // const { items, category } = task;
  const reset = () => {
    const newFormData = { ...checkFormData };
    const { items } = newFormData;
    newFormData.items = items.map((item) => ({
      ...item,
      selfScore: 0,
    }));

    setCheckFormData(newFormData);

    setIsReset(true);
  };

    const [score, setScore] = useState(0)
    const [isReset, setIsReset] = useState(false)

  const action = useCallback((actionType) => {
    const { author, id: requestId, task } = request;
    const { items: formItems } = checkFormData;
    const selfGrade = {
      id: `${request.id}-self-grade-${Date.now()}`,
      author,
      requestId,
      task,
      // items: formItems.
    };

    /*
    * "items": {
        "basic_p1": {
          "score": 20,
          "comment": "Well done!"
        },
        "extra_p1": {
          "score": 15,CheckForm
          "comment": "Some things are done, some are not"
        },
        "fines_p1": {
          "score": 10,
          "comment": "No ticket today"
        },
        "fines_p2": {
          "score": 20,
          "comment": "No ticket today"
        }
    *
    * */
    switch (actionType) {
      case ACTIONS.SAVE:
        save(request, checkFormData);
        break;
      case ACTIONS.SEND:
        send(request, checkFormData);
        break;
      default:
    }

    setScore(0);
    handleClose();
  });

  const changeScore = useCallback((id, value) => {
    const newFormData = { ...checkFormData };
    const { items } = newFormData;
    const item = items.find((el) => el.id === id);

    item.selfScore = value;

    setCheckFormData(newFormData);
  }, [checkFormData]);

  function res() {
    setIsReset(false);
  }

  useEffect(() => {
    createCheckForm(request, setCheckFormData);
  }, [request]);

  useEffect(() => {
    const { categoriesOrder = [], items = [] } = checkFormData;
    const sum = items.reduce((acc, { selfScore }) => acc + selfScore, 0);

    setScore(sum);

    if (show) {
      setCheckForm(
        <Form>
          {categoriesOrder.map((el) => (
            <div key={el}>
              <Alert variant='primary'><h2>{el}</h2></Alert>
              {
                items
                  .filter((item) => item.category === el)
                  .map(({
                    id, minScore, maxScore, title, description, selfScore, reviews,
                  }, i) => (
                      <Alert variant='warning' key={i}>
                        <h3>{title}</h3>
                        <p>Балл за выполнение: {maxScore}</p>
                        <p>{description}</p>
                        {
                          type === REQUESTS_TABLE_TYPES.DRAFTED_REQUESTS
                            ? (
                              <Range
                                isReset={isReset}
                                resetCallBack={res}
                                min={minScore}
                                max={maxScore}
                                onChange={changeScore.bind(null, id)}
                                value={selfScore}
                              />
                            )
                            : null
                        }
                      </Alert>
                  ))
              }
            </div>
          ))}
      </Form>,
      );
    }
  }, [checkFormData]);

  /* <Form
    categoriesOrder={checkFormData.categoriesOrder}
    items={checkFormData.items}
    range={type === REQUESTS_TABLE_TYPES.DRAFTED_REQUESTS}
    isReset={isReset}
    resetCallBack={res}
    onChange={changeScore}
  /> */
  return (
    <Modal show={show} onHide={close} size={'xl'}>
      <Modal.Header closeButton>
        <Modal.Title className="w-100">
          <div className='d-flex justify-content-between align-items-center'>
            <p className="my-0">{checkFormData.taskId}</p>
            <div className='d-flex align-items-center'>
              <Button variant="secondary" onClick={reset}>
                Reset
              </Button>
              <p className="my-0 mx-2">Score: {score}</p>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {checkForm}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={action.bind(null, ACTIONS.SAVE)}>
          Сохранить
        </Button>
        <Button variant="primary" onClick={action.bind(null, ACTIONS.SEND)}>
          Отправить результат
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
