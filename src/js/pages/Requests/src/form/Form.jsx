import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Alert,
} from 'react-bootstrap';
// import styles from './styles.module.scss';
import { REQUESTS_TABLE_TYPES } from '../../../../constants';
import Range from '../range';

const FormComponent = ({
  categoriesOrder, items, range, isReset, resetCallBack, onChange,
}) => {
  const t = '';
  return (
    <FormComponent>
      {categoriesOrder.map((el) => <div key={el}>
        <Alert variant='primary'><h2>{el}</h2></Alert>
        {items.filter((item) => item.category === el).map(({
          minScore, maxScore, title, description, selfScore, reviews,
        }, i) => <Alert variant='warning' key={i}>
          <h3>{title}</h3>
          <p>Балл за выполнение: {maxScore}</p>
          <p>{description}</p>
          {
            range
              ? (
                <Range
                  isReset={isReset}
                  resetCallBack={resetCallBack}
                  min={minScore}
                  max={maxScore}
                  onChange={onChange.bind(null, i)}
                  value={selfScore}
                />
              )
              : null
          }
        </Alert>)}
      </div>)}
    </FormComponent>
  );
};

Form.propTypes = {};

export default FormComponent;
