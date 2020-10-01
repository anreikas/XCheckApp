import React, { useState } from 'react';
import {
  Form, Button, Modal,
} from 'react-bootstrap';
import { ACTIONS } from '../../../../../constants';

const SendRequestModal = ({ show, action, onHide }) => {
  const [deployUrl, setDeployUrl] = useState('http://');
  const [prUrl, setPrUrl] = useState('https://github.com/');

  return (
    <Modal show={show} onHide={onHide} size={'xl'}>
      <Modal.Header closeButton>
        <Modal.Title className="w-100">
          <div className='d-flex justify-content-between align-items-center'>
            <p>deploy links</p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Deploy link</Form.Label>
            <Form.Control
              type="text"
              placeholder="Deploy link"
              value={deployUrl}
              onChange={(e) => setDeployUrl(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Github link</Form.Label>
            <Form.Control
              type="text"
              placeholder="Deploy link"
              value={prUrl}
              onChange={(e) => setPrUrl(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => action({
          actionType: ACTIONS.SAVE,
          deployUrl,
          prUrl,
        })}>
          Сохранить
        </Button>
        <Button variant="primary" onClick={() => action({
          actionType: ACTIONS.SEND,
          deployUrl,
          prUrl,
        })}>
          Отправить запрос на проверку
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

SendRequestModal.propTypes = {

};

export default SendRequestModal;
