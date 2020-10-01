import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

export default ({
  min = 0,
  max = 0,
  isReset,
  resetCallBack,
  onChange,
  value: inValue = null,
}) => {
  const [value, setValue] = useState(inValue || 0);

  useEffect(() => {
    if (isReset) {
      setValue(0);
      resetCallBack();
    }
  }, [isReset, resetCallBack]);

  const handleSetChange = ({ target: { value: elValue } }) => {
    const rangeValue = Number(elValue);
    setValue(rangeValue);
    onChange(rangeValue);
  };

  return (
        <Form.Group controlId="formBasicRange">
                    <Form.Control
                        className="review-range"
                        min={min || 0}
                        max={max || 0}
                        // defaultValue={0}
                        type="range"
                        value={value}
                        onChange={handleSetChange}
                        onMouseUp={handleSetChange}
                    />
        </Form.Group>
  );
};
