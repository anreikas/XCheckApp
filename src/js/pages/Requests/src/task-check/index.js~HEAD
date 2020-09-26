import React,{useState} from 'react'
import {Form,Button,Modal,Alert} from 'react-bootstrap'
import Range from './range'

import {reviewRequests} from './../../../../utils/index.js'


export default ({show,handleClose,task,name,finalSubmit}) => {

    const [score, setScore] = useState(0)
    const [scoreDetails, setScoreDetails] = useState()

    const [isReset, setIsReset] = useState(false)
    const [showFinal, setShowFinal] = useState(false)

    const [deploy, setDeploy] = useState('')
    const [git, setGit] = useState('')


    const reset = () => {
        setScore(0)
        setIsReset(true)
    }

    const close = () => {
        setScore(0)
        handleClose();
    }

    function res(){
      setIsReset(false)
    }

    function submit(){
      handleClose();
      setShowFinal(true)
    }

    function closeFinal(){
      setShowFinal(false)
      setScore(0)
    }

    

    async function submitFinal(){

      let obj = {
        "id": `req-id-${Date.now()}`,
        "crossCheckSessionId": "rss2020Q3react-xcheck",
        "author": name,
        "task": task.id,
        "state": "PUBLISHED",
        "selfGrade": {
          "task": task.id,
          "items": scoreDetails
        },
        "deployLink" : deploy,
        "githubLink" : git,
        "score": score
      }

      await reviewRequests.postRequest(obj)
      setShowFinal(false)
      
      finalSubmit()
    }


    const changeScore = () => {

        let obj = {}

        let sum = [...document.querySelectorAll('.review-range')].map(el => +el.value).reduce((a, b) => a + b);
        [...document.querySelectorAll('.review-range')].forEach(el => {
          obj[el.dataset.idk] = { "score" : el.value};
        })

        setScoreDetails(obj)
        console.log(obj)
        setScore(sum)
    }

    return (
      <>
        <Modal show={show} onHide={close} size={'xl'}>
          <Modal.Header closeButton>
            <Modal.Title className="w-100">
                <div className='d-flex justify-content-between align-items-center'>
                   <p className="my-0">{task.id}</p> 
                   <div className='d-flex align-items-center'>
                        <Button variant="secondary" onClick={reset}>
                            Reset
                        </Button>
                        <p className="my-0 mx-2">Score: {score}</p>  
                   </div> 
                </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {task.categoriesOrder.map((el) => 
                <div key={el}>
                    <Alert variant='primary'><h2>{el}</h2></Alert>
                  {task.items.filter(item => item.category === el).map(({id,minScore,maxScore,category,title,description}, i) => 
                    <Alert variant='warning' key={i}>
                      <h3>{title}</h3>
                      <p>Балл за выполнение: {maxScore}</p>
                      <p>{description}</p>
                            <Range
                                isReset={isReset}
                                resetCallBack={res}
                                min={minScore}
                                max={maxScore}
                                changeScore={(scr)=>changeScore(scr)}
                                idk={id}
                            />
                    </Alert>
                  )}
                </div>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={close}>
              Close
            </Button> */}
            <Button variant="primary" onClick={submit}>
              Отправить результат
            </Button>
          </Modal.Footer>
        </Modal>
        
        <Modal show={showFinal} onHide={closeFinal} size={'xl'}>
          <Modal.Header closeButton>
            <Modal.Title className="w-100">
                <div className='d-flex justify-content-between align-items-center'>
                   <p>deploy links</p>
                </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Deploy link</Form.Label>
                <Form.Control type="text" placeholder="Deploy link" value={deploy} onChange={(e)=>setDeploy(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Github link</Form.Label>
                <Form.Control type="text" placeholder="Deploy link" value={git} onChange={(e)=>setGit(e.target.value)}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={submitFinal}>
              Отправить результат
            </Button>
          </Modal.Footer>
        </Modal>
        </>
    )
}