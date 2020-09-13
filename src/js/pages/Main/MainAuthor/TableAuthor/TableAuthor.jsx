import React, { useCallback } from 'react';
import 'antd/dist/antd.css';
import TableComponent from '../../../../components/Table/Table';
import { SERVER_URL } from '../../../../constants';
import { UrlPath } from '../../../../utils';

const AuthorTable = ({
  setCreateNewTask, author, setUpdateTask, setTaskId,
}) => {
  const MAX_ROWS = 3;
  const path = UrlPath(SERVER_URL, 'tasks');

  const columns = [
    {
      title: 'task',
      dataIndex: 'id',
      width: '30%',
      editable: true,
      searched: true,
      textType: true,
      sorter: true,
    },
    {
      title: 'author',
      dataIndex: 'author',
      searched: true,
      textType: true,
      sorter: true,
    },
    {
      title: 'state',
      dataIndex: 'state',
      textType: true,
      sorter: true,
    },
    {
      title: 'score',
      dataIndex: 'score',
      sorter: (a, b) => a.score - b.score,
    },
  ];

  const onRowClickHandler = useCallback((record, rowIndex) => {
    setTaskId(record.id);
    setUpdateTask(true);
    setCreateNewTask(false);
    console.log('hello', record.id, ' / ', rowIndex);
  });

  return <>
    <TableComponent
      filter={{ author }}
      columns={columns}
      url={path}
      maxRows={MAX_ROWS}
      onClick={onRowClickHandler} />
    <button onClick={() => {
      setCreateNewTask(true);
      setUpdateTask(false);
    }}>Create task</button>
  </>;
};

export default AuthorTable;
