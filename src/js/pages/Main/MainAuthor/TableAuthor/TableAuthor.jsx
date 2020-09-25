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
    },
    {
      title: 'author',
      dataIndex: 'author',
      onFilter: (value, record) => record.author.indexOf(value) === 0,
    },
    {
      title: 'state',
      dataIndex: 'state',
      onFilter: (value, record) => record.state.indexOf(value) === 0,
      sorter: (a, b) => a.state > b.state ? 1: -1,
    },
    {
      title: 'score',
      dataIndex: 'score',
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
  </>
}

export default AuthorTable;
