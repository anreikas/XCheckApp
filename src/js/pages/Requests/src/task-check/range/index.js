import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

export default ({
  changeScore,
  min,
  max,
  isReset,
  resetCallBack,
}) => {
  const [change, setChange] = useState(0);
  useEffect(() => {
    if (isReset) {
      setChange(0);
      resetCallBack();
    }
  }, [isReset, resetCallBack]);

  const handleSetChange = (e) => {
    setChange(+e.target.value);
  };

  const handlesetMouse = () => {
    changeScore();
  };

  return (
    <Form.Group controlId="formBasicRange">
      <Form.Label>{change}</Form.Label>
        <Form.Control
            className="review-range"
            min = { min }
            max = { max }
            // defaultValue={0}
            type = "range"
            value = { change }
            onChange = { handleSetChange }
            onMouseUp = { handlesetMouse }
        />
    </Form.Group>
  );
};
