import React,{useState, useEffect } from 'react'
import {Form} from 'react-bootstrap'

export default ({changeScore,min,max,isReset,resetCallBack, idk, grade}) => {

    const [change, setChange] = useState(grade ? grade : 0); 


    useEffect(() => {
        if(isReset){
            setChange(0);
            resetCallBack()
        }
    },[isReset, resetCallBack]);

    

    const handleSetChange = (e) => {
        setChange(+e.target.value)
    }

    const handlesetMouse = (e) => {
        changeScore();
    }

    return(

        <Form.Group controlId="formBasicRange">
                <Form.Label>{change}</Form.Label>
                    <Form.Control 
                        data-idk={idk}
                        className='review-range'
                        min={min} 
                        max={max} 
                        // defaultValue={0}
                        type="range" 
                        value={change}
                        onChange={handleSetChange}
                        onMouseUp={handlesetMouse}
                    />
        </Form.Group>
    )
}