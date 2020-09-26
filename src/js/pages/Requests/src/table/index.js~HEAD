import React, { useEffect,useState } from 'react'
// import {review} from '../data.js'
import { Table,Tag,Button  } from 'antd';
import {reviewRequests} from './../../../../utils/index.js'




const columns = [
    {
      title: 'task',
      dataIndex: 'task',
      deploy: 'deploy',
      render:  (dataIndex,obj) => <a href={obj.deploy}>{dataIndex}</a>,
      onFilter: (value, record) => record.task.indexOf(value) === 0,
      sorter: (a, b) => a.task.length - b.task.length,
    },
    {
      title: 'author',
      dataIndex: 'author',
      render:  (dataIndex,obj) => <a href={obj.git}>{dataIndex}</a>,
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



  export default () => {
      const [data, setData] = useState([])
      

      useEffect(()=>{
        reviewRequests.getRequests().then((body)=>{
          setData(body.map( el => {
            return{
              key : el.id,
              task : el.task,
              author : el.author,
              state: el.state,
              score: el.selfGrade,
              deploy: el.deployLink,
              git: el.githubLink
            }
        }))
        })
      },[reviewRequests])

      return(
        <Table columns={columns} bordered dataSource={data} />
      )
  }