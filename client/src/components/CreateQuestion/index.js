import React from "react";
import Answer from "./Answer"

function CreateQuestion (props){
    return(
        <div>
            <h3>Question {props.key}:</h3>
            <input
                className="form-control"
                id="Title"
                value={props.contents.question}
                type="text"
                placeholder="Write Your Question here"
                onChange={props.handleInputChange(props.key)}
                required
            />
            {props.answers.map(answer=>{
                return(
                <Answer 
                    key={answer.key}
                    value={props.contents.answers.answer}
                    onChange={props.handleInputChange}
                />
                )
            })}
            <button onClick={props.addAnswer(props.key)}>Add an incorrect answer</button>
        </div>
    )
}

export default CreateQuestion;