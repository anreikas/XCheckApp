import React,{useState} from 'react'
import {Form,Button,Modal,Alert} from 'react-bootstrap'
import Range from './range'


export default ({show,handleClose,task}) => {

    const [score, setScore] = useState(0)
    const [isReset, setIsReset] = useState(false)

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


    const changeScore = () => {
        let sum = [...document.querySelectorAll('.review-range')].map(el => +el.value).reduce((a, b) => a + b);
        setScore(sum)
    }

    return (
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
            <Button variant="primary" onClick={close}>
              Отправить результат
            </Button>
          </Modal.Footer>
        </Modal>
    )
}