import React from 'react'
import {review} from '../data.js'
import { Table,Tag } from 'antd';

const MAX_ROWS = 50;
const columns = [
  {
    title: 'task',
    dataIndex: 'task',
    searched: true,
    sorter: true,
  },
  {
    title: 'author',
    dataIndex: 'author',
    searched: true,
    sorter: true,
  },
  {
    title: 'state',
    dataIndex: 'state',
    render: (tag) => (
      <Tag color={'geekblue'} key={tag}>
        {tag}
      </Tag>
    ),
    sorter: true,
  },
  {
    title: 'score',
    dataIndex: 'score',
    sorter: true,
    map: ((record) => {
      const { selfGrade = {} } = record;
      const { items } = selfGrade;

const columns = [
    {
      title: 'task',
      dataIndex: 'task',
      onFilter: (value, record) => record.task.indexOf(value) === 0,
      sorter: (a, b) => a.task.length - b.task.length,
    },
    {
      title: 'author',
      dataIndex: 'author',
      onFilter: (value, record) => record.author.indexOf(value) === 0,
      sorter: (a, b) => a.author.length - b.author.length,
    },
    {
      title: 'state',
      dataIndex: 'state',
      render: tag => (
              <Tag color={'geekblue'} key={tag}>
                {tag}
              </Tag>
      ),
      onFilter: (value, record) => record.tags.indexOf(value) === 0,
      sorter: (a, b) => a.tags.length - b.tags.length,
    },
    {
      title: 'score',
      dataIndex: 'score',
      sorter: {
        compare: (a, b) => a.score - b.score,
        multiple: 1,
      },
    },
  ];

  const datas = review.map( el => {
      let scr = el.grade.items.basic_p1.score + el.grade.items.extra_p1.score + el.grade.items.fines_p1.score
      return{
        key : el.author,
        task : el.grade.task,
        author : el.author,
        state: el.state,
        score: scr,
      }
  })



export default ({ onClick, filter, title, update, onUpdate }) => (
  <Table
    title={title}
    onClick={onClick}
    columns={columns}
    url={UrlPath(SERVER_URL, 'reviewRequests')}
    maxRows={MAX_ROWS}
    filter={filter}
    update={update}
    onUpdate={onUpdate}
  />
);
