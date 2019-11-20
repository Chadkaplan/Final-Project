import React from 'react';
import {
  Form, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardImg, CardBody, CardTitle, Button, Row, Col
} from 'reactstrap';
import CreateMCQuestion from "../../../components/CreateMCQuestion";
import QuizLogo from "../../../assets/quizLogo.jpg";
import Category from "../../../assets/Category.json"

class Create extends React.Component {
  state = {
    name: "",
    author: "",
    quizType: "Multiple Choice",
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
    catDropdownOpen: false,
    timeDropdownOpen: false,
    timeOptions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  }

  fakeState = {
    name: "",
    author: "",
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
    const name = parseInt(event.target.name)
    this.fakeState.contents[name-1].question=value
    this.setState({contents: this.fakeState.contents})

  };

  handleAnswerInputChange = event => {
    const value = event.target.value;
    this.fakeState.contents[event.target.questionKey-1].answers[parseInt(event.target.name)-1].answer=value
    this.setState({contents: this.fakeState.contents})
  }

  handleFormSubmit = event => {
    event.preventDefault()
    let a =this.state
    return(this.submit(a))
  }

  submit(data){
    let y = JSON.stringify({
      contents: data.contents,
      timeLimit: data.timeLimit,
      author: data.author,
      description: data.description,
      category: data.category,
      quizType: data.quizType,
      name: data.name,

    })
    console.log(y)
    fetch("/api/quiz/create", {
      method: "POST",
      body: y
    }).then(response=>{
      console.log(response)
    })
  }
  
  addAnswer = event =>{
    event.preventDefault()
    let name = parseInt(event.target.name)
    console.log(name)
    let a = this.fakeState.contents[name-1].answers
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

  toggle = () => { this.setState({ dropdownOpen: !this.state.catDropdownOpen }) }

  toggleTime = () => { this.setState({ dropdownOpen: !this.state.timeDropdownOpen }) }

  render(){ 
     return (
    <div>
      <Card>
		{/* WHY IS THE LOGO NOT LOADING INTO THE CARD */}
        <CardBody>
          <CardTitle className="text-center"><h1><strong>Create A Quiz</strong></h1></CardTitle>
        <CardImg top width="100%" src={QuizLogo} alt="Quiz Logo image" />
		      <br/>
          <Row></Row>
          <Form onSubmit={this.handleFormSubmit.bind(this)}>
          <Row>
            <Col>
              <Row>
                Quiz Name:
              </Row>
              <Row>
                <input
                  onChange={this.handleNonContentInputChange.bind(this)}
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
              <Row>
                Category:
              </Row>
              <Row>
                <Dropdown className="dropdown" isOpen={this.state.catDropdownOpen} toggle={this.toggle}>
						      <DropdownToggle  caret>
							      Category: {this.state.category}
					        </DropdownToggle>
						      <DropdownMenu id="dropdown" value={this.state.category} name="category" onClick={this.handleNonContentInputChange.bind(this)}>
							      {Category.map(category=>{
                      return(
                        <DropdownItem value={category.category} key={category.id}>{category.category}</DropdownItem>
                      )
                    })}
						      </DropdownMenu>
                </Dropdown>
              </Row>
            </Col>
            <Col>
              {/*Time Limit dropdown */}
              <Row>
                Time Limit:
              </Row>
              <Row>
                <Dropdown className="dropdown" isOpen={this.state.timeDropdownOpen} toggle={this.toggleTime}>
						      <DropdownToggle  caret>
							      Time Limit: {this.state.category}
					        </DropdownToggle>
						      <DropdownMenu id="dropdown" value={this.state.category} name="timeLimit" onClick={this.handleNonContentInputChange.bind(this)}>
							      {this.state.timeOptions.map(multiplier=>{
                      let min = Math.floor(multiplier/2)
                      let sec = multiplier%2===0?"00":"30"
                      return(
                        <DropdownItem value={`${min}m ${sec}s`} key={multiplier}>{`${min}m ${sec}s`}</DropdownItem>
                      )
                    })}
						      </DropdownMenu>
                </Dropdown>
              </Row>
            </Col>
          </Row>
          <br/>
          {this.state.contents.map(question=>{
            return(
            <CreateMCQuestion 
            key={question.key}
            questionKey={question.key}
            contents={question}
            question={question.question}
            answers={question.answers}
            addAnswer={this.addAnswer}
            handleQuestionInputChange={this.handleQuestionInputChange}
            handleAnswerInputChange = {this.handleAnswerInputChange}
            />
          )})}
          <br/>
          <Row>
            <Button onClick={this.addQuestion}>Add another Question</Button>
          </Row>
          <br/>
          <Row>
            Description:
            <input
              onChange={this.handleNonContentInputChange.bind(this)}
              value={this.state.description}
              name="description"
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter description here"
            />
          </Row>
          <br/>
          <Row>
            <Button onClick={this.handleFormSubmit}>Submit</Button>
          </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  )}
};

export default Create;