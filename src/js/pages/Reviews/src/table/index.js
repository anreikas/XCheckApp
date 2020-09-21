import React from 'react'
import {review} from '../data.js'
import { Table,Tag } from 'antd';

// export default () => {
//     return(
//         <div>hi</div>
//     )
// }

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



  export default () => {
      console.log(datas)
      return(
        <Table columns={columns} bordered dataSource={datas} />
      )
  }