<<<<<<< HEAD
import React from 'react';
import { Table, Tag } from 'antd';
import 'antd/dist/antd.css';

const AuthorTable = ({tasksAuthor, setCreateNewTask, setUpdateTask}) => {
  const columns = [
    {
      title: 'task',
      dataIndex: 'task',
      onFilter: (value, record) => {
        return record.task.indexOf(value) === 0
      },
      sorter: (a, b) => a.task > b.task?1:-1,
=======
import React, { useCallback, useState } from 'react';
import { Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import TableComponent from '../../../../components/Table/Table';
import { SERVER_URL } from '../../../../constants';
import { UrlPath } from '../../../../utils';

const AuthorTable = ({ setCreateNewTask, author, setUpdateTask,setTaskId}) => {

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
>>>>>>> 672e8c55492ac18c04f9bc265fde009971d90ed3
    },
    {
      title: 'author',
      dataIndex: 'author',
<<<<<<< HEAD
      onFilter: (value, record) => record.author.indexOf(value) === 0,
=======
      searched: true,
      textType: true,
      sorter: true,
>>>>>>> 672e8c55492ac18c04f9bc265fde009971d90ed3
    },
    {
      title: 'state',
      dataIndex: 'state',
<<<<<<< HEAD
      onFilter: (value, record) => record.state.indexOf(value) === 0,
      sorter: (a, b) => a.state > b.state ? 1: -1,
=======
      textType: true,
      sorter: true,
>>>>>>> 672e8c55492ac18c04f9bc265fde009971d90ed3
    },
    {
      title: 'score',
      dataIndex: 'score',
<<<<<<< HEAD
      sorter: {
        compare: (a, b) => a.score - b.score,
        multiple: 1,
      },
    },
    {
      title: 'edit',
      dataIndex: 'edit',
      render: tag => (
                <Tag color={'geekblue'} onClick={()=>setUpdateTask(true)} key={tag}>
                  {tag}
                </Tag>
        ),
    },
  ];

  const datas = tasksAuthor.map( (el, i) => {
    const scr = el.items.map(el => el.maxScore).reduce((a,b) => a + b);
    return{
      key : `${el.author}${i}`,
      task : el.id,
      author : el.author,
      state: el.state,
      score: scr,
      edit: 'edit',
    }
  })

  return <>
    <Table columns={columns} bordered dataSource={datas} onClick={(record, rowIndex)=>console.log(record)} />
    <button onClick={()=>setCreateNewTask(true)}>Create task</button>
=======
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
    <TableComponent filter={{ author: author }} columns={columns} url={path} maxRows={MAX_ROWS} onClick={onRowClickHandler} /> 
    <button onClick={()=>{
      setCreateNewTask(true);
      setUpdateTask(false);
    }}>Create task</button>
>>>>>>> 672e8c55492ac18c04f9bc265fde009971d90ed3
  </>
}

export default AuthorTable;
