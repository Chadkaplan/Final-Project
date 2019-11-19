import React from "react";
import Answer from "./Answer";
import {Row, Col} from "reactstrap"

function CreateQuestion (props){
    return(
        <div>
            <Row>
                <h3>Question {props.key}:</h3>
            </Row>
            <Row>
                <input
                    className="form-control"
                    id="Title"
                    value={props.contents.question}
                    type="text"
                    placeholder="Write Your Question here"
                    onChange={props.handleQuestionInputChange(props.key)}
                    required
                />
            </Row>
            {props.answers.map(answer=>{
                return(
                <Answer 
                    key={answer.key}
                    questionKey={props.key}
                    value={props.contents.answers.answer}
                    onChange={props.handleAnswerInputChange}
                />
                )
            })}
            <button onClick={props.addAnswer(props.key)}>Add an incorrect answer</button>
        </div>
    )
}

export default CreateQuestion;