import React from "react";
import Answer from "./Answer";
import {Row, Col, Button} from "reactstrap"

function CreateQuestion (props){
    return(
        <div>
            <Row>
                <h3>Question {props.questionKey}:</h3>
            </Row>
            <Row>
                <input
                    className="form-control"
                    id="Title"
                    value={props.contents.question}
                    type="text"
                    placeholder="Write Your Question here"
                    onChange={props.handleQuestionInputChange.bind(this)}
                    name={props.questionKey}
                    required
                />
            </Row>
            <Row></Row>
            {props.answers.map(answer=>{
                return(
                <Row>
                    <Col>
                        <Row>
                        <Answer 
                            key={answer.key}
                            name={answer.key}
                            questionKey={props.questionKey}
                            correct={answer.correct}
                            value={props.contents.answers.answer}
                            onChange={props.handleAnswerInputChange.bind(this)}
                        />
                        </Row>
                        <Row></Row>
                    </Col>
                </Row>
                )
            })}
            <Row><Button onClick={props.addAnswer.bind(this)} name={props.questionKey}>Add an incorrect answer</Button></Row>
        </div>
    )
}

export default CreateQuestion;