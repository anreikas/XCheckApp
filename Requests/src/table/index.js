import React, { useEffect,useState } from 'react'
// import {review} from '../data.js'
import { Table,Tag, Button  } from 'antd';
import {reviewRequests} from './../../../../utils/index.js'
import {} from 'react-bootstrap'

import TaskCheck from '../task-check/index'








  export default ({state,author}) => {

      const [taskData, setTaskData] = useState([]);
      const [show, setShow] = useState(false);
      const [taskId, setTaskId] = useState(null)

      const handleClose = () => {
        setShow(false)
      };
      const handleShow = (task,grade,score,id) => {
        let tsk = taskData.filter(el=> el.id === task)
        tsk[0].grade = grade;
        tsk[0].score = score
        tsk[0].id = id
        console.log(tsk)
        setTaskId(tsk[0])
        setShow(true)
      };

      const [data, setData] = useState([])

      const submit = () => {
        handleClose()
      }



      useEffect(()=>{
        reviewRequests.getTask().then((body)=>setTaskData(body))
        reviewRequests.getRequests().then((body)=>{
          setData(body.filter(el => {
            if(state === 'PUBLISHED'){
              return el.author !== author && el.state === 'PUBLISHED'
            } else if (state === 'DRAFT'){
              return el.author === author && el.state === 'DRAFT'
            }
          }).map( el => {
            console.log(el.author)
            return{
              key : el.id,
              task : el.task,
              author : el.author,
              state: el.state,
              score: el.score,
              deploy: el.deployLink,
              git: el.githubLink,
              button: state === 'DRAFT' ? "Изменить" : "Проверить",
              grade: el.selfGrade.items
            }
        }))
        })
      },[reviewRequests])


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
        {
          title: 'button',
          dataIndex: 'button',
          render: (title,obj) => <Button onClick={()=>handleShow(obj.task, obj.grade, obj.score, obj.key, obj.state)} variant="primary mt-1">{title}</Button> ,
        },
      ];

      console.log(data)

      return(
        <>
        <Table columns={columns} bordered dataSource={data} />
        {taskId ? <TaskCheck
        show={show}
        handleClose={submit}
        task={taskId}
        // name={'Flat'}
        finalSubmit={()=>setShowTable(true)}
        />:null}
        </>

      )
  }
