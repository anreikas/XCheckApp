import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import TableComponent from '../../components/Table';
import { UrlPath } from '../../utils';
import { SERVER_URL } from '../../constants';

import './Reviews.scss';
import './styles.scss';

const MAX_ROWS = 3;
const path = UrlPath(SERVER_URL, 'reviews');

const Reviews = () => {
  const Columns = [
    {
      title: 'Task-Name',
      dataIndex: 'id',
      width: '30%',
      editable: true,
      searched: true,
      sorter: true,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      searched: true,
      sorter: true,
    },
    {
      title: 'Score',
      dataIndex: 'score',
      sorter: (a, b) => a.score - b.score,
    },
    {
      title: 'State',
      dataIndex: 'state',
      textType: true,
      sorter: true,
    },
    {
      title: 'Reviewer',
      width: '30%',
      dataIndex: 'reviewer',
      textType: true,
      sorter: true,
    },
  ];
  const onRowClickHandler = useCallback((record, rowIndex) => console.log('hello', record, ' / ', rowIndex));

  return (
    <>
      <TableComponent
        columns={Columns}
        url={UrlPath(SERVER_URL, 'tasks')}
        maxRows={MAX_ROWS}
        onClick={onRowClickHandler}
      />
      <TableComponent
        columns={Columns}
        url={path}
        filter={{ author: 'rgovin' }}
        maxRows={MAX_ROWS}
        onClick={onRowClickHandler}
      />
    </>
  );
};

export default Reviews;
