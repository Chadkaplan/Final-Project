import React from 'react';
import {
  Card, CardImg, CardBody, CardTitle, Button
} from 'reactstrap';
import CreateQuestion from "../../../components/CreateQuestion"

class Create extends React.Component {
  state = {
    contents: [{
      key: 1,
      question: "",
      answers: [{
        key: 1,
        answer: "",
        correct: true
      },
      {
        key: 2,
        answer: "",
        correct: false
      }]
    }]

  }

  handleInputChange = event => {
    const value = event.target.value;
  };
  
  addAnswer(key){
    let a = this.state.contents.question[key-1].answers
    a.push({
      key: a.length+1,
      answer: "",
      correct: false
    })
  }

  addQuestion(){
    let b = this.state.contents
    b.push({
      key: b.length+1,
      question: "",
      answers: [{
        key: 1,
        answer: "",
        correct: true
      },
      {
        key: 2,
        answer: "",
        correct: false
      }]
    })
  }

  render(){ 
     return (
    <div>
      <Card>
		{/* WHY IS THE LOGO NOT LOADING INTO THE CARD */}
        <CardBody>
          <CardTitle className="text-center"><h1><strong>Create A Quiz</strong></h1></CardTitle>
        <CardImg top width="100%" src="./assets/quizLogo.jpg" alt="Quiz Logo image" />
		<br/>
          <Button>Create A Quiz!</Button>
          {this.state.contents.map(question=>{
            return(
            <CreateQuestion 
            key={question.key}
            contents={this.state.contents[question.key-1]}
            answers={question.answers}
            addAnswer={this.addAnswer}
            />
          )})}
        </CardBody>
      </Card>
    </div>
  )}
};

export default Create;