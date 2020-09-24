import React from 'react';
import './Reviews.scss';
import App from './src/App'

const Reviews = (props) => {
  return (
    <div className="reviews__container">
      <TableComponent
        columns={Columns}
        url={path}
        maxRows={MAX_ROWS}
        onClick={onRowClickHandler}
      />
    </div>
  );
};

export default Reviews;
