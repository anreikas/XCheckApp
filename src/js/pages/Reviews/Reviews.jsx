import React from 'react';
import './Reviews.scss';
import App from './src/App'

const Reviews = (props) => {
  return (
    <>
      <TableComponent
        columns={Columns}
        url={path}
        maxRows={MAX_ROWS}
        onClick={onRowClickHandler}
      />
    </>
  );
};

export default Reviews;
