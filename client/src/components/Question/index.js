import React from "react";
import {Row, Col} from "reactstrap"
import MCQuestion from "./mcQuestion";



function Question (props){
    return(
        <div>
            <Row>
                Question {props.question.key}:
            </Row>
            <Row>
                {props.question.question}
            </Row>
            <MCQuestion answers={props.answers} handleMCChange={props.handleMCChange} question={props.question}/>
        </div>
        
    )
}



export default Question