import React from "react";
import {Row} from "reactstrap";


function mcQuestion (props){
    return(
        <div>
            <Row>
                {props.question}
            </Row>
            <Row onChange={props.handleMCChange.bind(this)}>
                {props.answers.map(answer => {
                    return(
                        <input type="radio" value={answer.correct} key={answer.key} name={props.question}>{answer.answer}</input>
                    )
                })}
            </Row>
        </div>
    )
}

export default mcQuestion