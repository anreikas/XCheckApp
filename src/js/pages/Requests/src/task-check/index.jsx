import React, { useState, useEffect, useCallback } from 'react';
import {
  Form, Button, Modal, Alert,
} from 'react-bootstrap';
import SendRequestModal from './sendRrequestModal';
import Range from '../range';
import { REQUESTS_TABLE_TYPES, STATES, ACTIONS } from '../../../../constants';
import { createCheckForm, sendRequest, sendReview } from '../actions';
// import Form from '../form';

const TaskCheck = ({
  request, type, show, handleClose, onSend, author: AUTHOR,
}) => {
  const [checkFormData, setCheckFormData] = useState({});
  const [checkForm, setCheckForm] = useState(null);
  const [sendModal, setSendModal] = useState(null);
  const [score, setScore] = useState(0);
  const [isReset, setIsReset] = useState(false);
  const [scoreText, setScoreText] = useState('score');
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

  const close = () => {
    setScore(0);
    handleClose();
  };
  const getGrade = useCallback(() => {
    const { id: requestId, task } = request;
    const { items: formItems } = checkFormData;

    return {
      id: `${requestId}-self-grade-${Date.now()}`,
      author: AUTHOR,
      requestId,
      task,
      items: Object.fromEntries(formItems.map((formItem) => {
        const { id, selfScore, comment = '' } = formItem;

        return [id, { score: selfScore, comment }];
      })),
    };
  }, [request, checkFormData]);

  const action = useCallback(({ actionType, deployUrl, prUrl }) => {
    const {
      author,
      id: requestId,
      task,
      deployUrl: requestDeployUrl,
      prUrl: requestPrUrl,
    } = request;
    const grade = getGrade();

    let state = '';

    switch (actionType) {
      case ACTIONS.SAVE:
        state = STATES.DRAFT;
        break;
      case ACTIONS.SEND:
        state = STATES.PUBLISHED;
        break;
      default:
    }

    if (type === REQUESTS_TABLE_TYPES.DRAFTED_REQUESTS) {
      sendRequest({
        ...request,
        selfGrade: grade,
        state,
        deployUrl,
        prUrl,
      }, onSend);
    } else if (type === REQUESTS_TABLE_TYPES.PUBLISHED_REQUESTS) {
      sendReview({
        author,
        requestId,
        grade,
        state,
        task,
        deployUrl: requestDeployUrl,
        prUrl: requestPrUrl,
      });
    }

    handleClose();
  });
  const onCommentChange = useCallback((id, { target: { value } }) => {
    const newFormData = { ...checkFormData };
    const { items } = newFormData;
    const item = items.find((el) => el.id === id);

    item.comment = value;

    setCheckFormData(newFormData);
  });
  const changeScore = useCallback((id, value) => {
    const newFormData = { ...checkFormData };
    const { items } = newFormData;
    const item = items.find((el) => el.id === id);

    item.selfScore = value;

    setCheckFormData(newFormData);
  }, [checkFormData]);
  const showRequestFrom = useCallback((showForm) => {
    if (showForm) {
      setSendModal(
        <SendRequestModal
          action={action}
          onHide={handleClose}
          show={true}
        />,
      );
    } else {
      setSendModal(null);
    }
  });

  function res() {
    setIsReset(false);
  }

  useEffect(() => {
    if (type === REQUESTS_TABLE_TYPES.PUBLISHED_REVIEWS) {
      createCheckForm({
        ...request,
        selfGrade: request.grade,
      }, setCheckFormData);
    } else {
      createCheckForm(request, setCheckFormData);
    }
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
                    id, minScore, maxScore, title, description, selfScore, comment,
                  }, i) => (
                      <Alert variant='warning' key={i}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h3>{title}</h3>
                            <p>Максимальный балл: {maxScore}</p>
                            <p>{description}</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <span className="my-0 mx-2">{scoreText}: </span>
                            <h3>{selfScore}</h3>
                          </div>
                        </div>
                        {
                          type !== REQUESTS_TABLE_TYPES.PUBLISHED_REVIEWS
                            ? (<Range
                              isReset={isReset}
                              resetCallBack={res}
                              min={minScore}
                              max={maxScore}
                              onChange={changeScore.bind(null, id)}
                              value={selfScore}
                            />)
                            : null
                        }
                        {
                          type === REQUESTS_TABLE_TYPES.PUBLISHED_REQUESTS
                            ? (
                              <div className="form-item-comment">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control type="text" placeholder="comment" onChange={onCommentChange.bind(null, id)}/>
                              </div>
                            )
                            : null
                        }
                        {
                          type === REQUESTS_TABLE_TYPES.PUBLISHED_REVIEWS
                            ? <p>Comment: {comment}</p>
                            : null
                        }
                      </Alert>
                  ))
              }
            </div>
          ))}
      </Form>,
      );

      switch (type) {
        case REQUESTS_TABLE_TYPES.PUBLISHED_REQUESTS:
          setScoreText('Yours');
          break;
        case REQUESTS_TABLE_TYPES.DRAFTED_REQUESTS:
          setScoreText('Self');
          break;
        default:
          setScoreText('Score');
      }
    }
  }, [checkFormData]);

  return (
    <>
      <Modal show={show} onHide={close} size={'xl'}>
        <Modal.Header closeButton>
          <Modal.Title className="w-100">
            <div className='d-flex justify-content-between align-items-center'>
              <p className="my-0">{checkFormData.taskId}</p>
              <div className='d-flex align-items-center'>
                {
                  type !== REQUESTS_TABLE_TYPES.PUBLISHED_REVIEWS
                    ? (<Button variant="secondary" onClick={reset}>
                      Reset
                    </Button>)
                    : null
                }
                <p className="my-0 mx-2">Score: {score}</p>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(type === REQUESTS_TABLE_TYPES.PUBLISHED_REQUESTS
            || type === REQUESTS_TABLE_TYPES.PUBLISHED_REVIEWS)
            ? (
              <div>
                <Alert style={{ marginTop: '20px' }} variant="info">
                  <span>Deploy: </span>
                  <Alert.Link target="_blank" href={checkFormData.deployUrl}>
                    {checkFormData.deployUrl}
                  </Alert.Link>
                </Alert>
                <Alert style={{ marginTop: '20px' }} variant="info">
                  <span>Pull request: </span>
                  <Alert.Link target="_blank" href={checkFormData.prUrl}>
                    {checkFormData.prUrl}
                  </Alert.Link>
                </Alert>
              </div>
            )
            : null
          }
          {checkForm}
        </Modal.Body>
        <Modal.Footer>
          {
            type === REQUESTS_TABLE_TYPES.DRAFTED_REQUESTS
              ? (<Button variant="secondary" onClick={action.bind(null, { actionType: ACTIONS.SAVE })}>
                Сохранить
              </Button>)
              : null
          }
          {
            type === REQUESTS_TABLE_TYPES.DRAFTED_REQUESTS
              ? (<Button variant="primary" onClick={() => {
                setCheckForm(null);
                showRequestFrom(true);
              }}>
                  Создать запрос
              </Button>)
              : (<Button variant="primary" onClick={action.bind(null, { actionType: ACTIONS.SEND })}>
                Отправить результат
              </Button>)
          }
        </Modal.Footer>
      </Modal>
      {sendModal}
    </>
  );
};

export default TaskCheck;
