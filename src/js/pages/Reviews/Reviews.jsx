import React, { useState, useCallback } from 'react';
import TableComponent from '../../components/Table';
import { UrlPath } from '../../utils';
import { SERVER_URL, REQUESTS_TABLE_TYPES, STATES } from '../../constants';
import TaskCheck from '../Requests/src/task-check/index.jsx';
import './Reviews.scss';
import './styles.scss';

const MAX_ROWS = 10;
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
      map: ((record) => {
        const { grade = {} } = record;
        const { items } = grade;

        if (items) {
          return Object.entries(items).reduce((acc, [, value]) => {
            const { score } = value;

            return acc + score;
          }, 0);
        }

        return '--';
      }),
      sorter: (a, b) => a.score - b.score,
    },
    {
      title: 'State',
      dataIndex: 'state',
      textType: true,
      filters: [
        {
          text: STATES.PUBLISHED,
          value: STATES.PUBLISHED,
        },
        {
          text: STATES.DRAFT,
          value: STATES.DRAFT,
        },
      ],
      onFilter: (value, record) => record.state.indexOf(value) === 0,
    },
    {
      title: 'Reviewer',
      width: '30%',
      dataIndex: 'reviewer',
      textType: true,
      sorter: (a, b) => (a > b ? 1 : -1),
      map: (record) => record.grade.author,
    },
  ];
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
