import React from "react";

function Answer (props){
    return(
            <input
                key={props.key}
                className="form-control"
                id="Title"
                type="text"
                value={props.value}
                placeholder={props.key===1?"Write the correct answer here":"Write an incorrect option here"}
                name={props.name}
                onChange={props.handleInputChange(props.key)}
                correct={props.key===1?true:false}
                required
            />
    )
}

export default Answer