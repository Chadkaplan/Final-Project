import React from "react";
import {Row, Form} from "reactstrap";


function mcQuestion (props){
    return(
        <div>
            <Row>
                {props.question}
            </Row>
            <Form>
                {props.answers.map(answer => {
                    return(
                        <Row>
                            <input type="radio" value={answer.correct} key={answer.key} name={props.question} onChange={props.handleMCChange}>{answer.answer}</input>
                        </Row>
                    )
                })}
            </Form>
        </div>
    )
}

export default mcQuestion