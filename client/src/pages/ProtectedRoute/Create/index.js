import React from 'react';
import {
  Card, CardImg, CardBody, CardTitle, Button, Row, Col
} from 'reactstrap';
import CreateMCQuestion from "../../../components/CreateMCQuestion";
import Auth from "../../../utils/Auth";
import QuizLogo from "../../../assets/quizLogo.jpg"

class Create extends React.Component {
  state = {
    name: "",
    author: Auth.username,
    quizType: "",
    description: "",
    contents: [{
      key: 1,
      questionType: "Multiple Choice",
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
    }],
    timeLimit: "",
    category: "",
  }

  fakeState = {
    name: "",
    author: Auth.username,
    quizType: "",
    description: "",
    contents: [{
      key: 1,
      questionType: "Multiple Choice",
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
    }],
    timeLimit: "",
    category: "",
  }

  handleNonContentInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handleQuestionInputChange = event => {
    const value = event.target.value;
    this.fakeState.contents[event.target.key-1].question=value
    this.setState({contents: this.fakeState.contents})

  };

  handleAnswerInputChange = event => {
    const value = event.target.value;
    this.fakeState.contents[event.target.questionKey-1].answers[event.target.key-1].answer=value
    this.setState({contents: this.fakeState.contents})
  }

  handleFormSubmit = event => {
    event.preventDefault()
    return(this.submit())
  }

  submit(){
    fetch("/api/quiz/submit", {
      method: "POST",
      body: this.state
    })
  }
  
  addAnswer = event =>{
    event.preventDefault()
    let key = event.target.key
    let a = this.fakeState.contents[key-1].answers
    a.push({
      key: a.length+1,
      answer: "",
      correct: false
    })
    this.setState({contents: this.fakeState.contents})
  }

  addQuestion= event => {
    event.preventDefault()
    let b = this.fakeState.contents
    b.push({
      key: b.length+1,
      questionType: "Multiple Choice",
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
    this.setState({contents: this.fakeState.contents})
  }

  render(){ 
     return (
    <div>
      <Card>
		{/* WHY IS THE LOGO NOT LOADING INTO THE CARD */}
        <CardBody>
          <CardTitle className="text-center"><h1><strong>Create A Quiz</strong></h1></CardTitle>
        <CardImg top width="100%" src={QuizLogo} alt="Quiz Logo image" />
		<br/>
          <Row>Create A Quiz!</Row>
          <Row>
            <Col>
              <Row>
                Quiz Name:
              </Row>
              <Row>
                <input
                  onChange={this.handleNonContentInputChange}
                  value={this.state.name}
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter the name of your quiz here"
                  id="quizName"
                />
              </Row>
            </Col>
            <Col>
              {/*Category dropdown */}
            </Col>
            <Col>
              {/*Time Limit dropdown */}
            </Col>
            <Col>
              {/*Quiz type dropdown */}
            </Col>
          </Row>
          {this.state.contents.map(question=>{
            return(
            <CreateMCQuestion 
            key={question.key}
            contents={question}
            question={question.question}
            answers={question.answers}
            addAnswer={this.addAnswer}
            handleQuestionInputChange={this.handleQuestionInputChange}
            handleAnswerInputChange = {this.handleAnswerInputChange}
            />
          )})}
          <Button onClick={this.handleFormSubmit}>Submit</Button>
        </CardBody>
      </Card>
    </div>
  )}
};

export default Create;