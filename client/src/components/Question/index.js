import React from "react";
import {Row, Col} from "reactstrap"
import mcQuestion from "./mcQuestion";

function renderSwitch(param) {
    switch(param) {
      case 'Multiple Choice':
        return <mcQuestion />;
      default:
        return <mcQuestion />;
    }
}

function Question (props){
    return(
        <div>
            <Row>
                Question {props.question.key}:
            </Row>
            {renderSwitch(props.questionType)}
        </div>
        
    )
}



export default Question