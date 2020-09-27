import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import TableComponent from '../../components/Table';
import { UrlPath } from '../../utils';
import { SERVER_URL, REQUESTS_TABLE_TYPES } from '../../constants';
import TaskCheck from '../Requests/src/task-check/index.js';
import './Reviews.scss';
import './styles.scss';

const MAX_ROWS = 50;
const path = UrlPath(SERVER_URL, 'reviews');

const Reviews = () => {
  const Columns = [
    {
      title: 'Task-Name',
      dataIndex: 'task',
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
  const [taskCheck, setTaskCheck] = useState(null);
  const handleClose = () => {
    setTaskCheck(null);
  };
  const showTaskCheck = useCallback((review) => {
    setTaskCheck(
      <TaskCheck
        show={true}
        type={REQUESTS_TABLE_TYPES.PUBLISHED_REVIEWS}
        handleClose={handleClose}
        request={review}
      />,
    );
  }, []);
  return (
    <>
      <TableComponent
        columns={Columns}
        url={path}
        // filter={{ author: 'rgovin' }}
        maxRows={MAX_ROWS}
        onClick={showTaskCheck}
      />
      <div className="container">
        {taskCheck}
      </div>
    </>
  );
};

export default Reviews;
