import React from 'react';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardImg, CardBody, CardTitle, Button, Row, Col
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
      name: value
    });
    console.log()
  }
  handleCategoryInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      name: value
    });
    console.log()
  }
  handleTimeInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      name: value
    });
    console.log()
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
    this.setState(
    {    name: "",
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
    timeOptions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]})
    alert("Your quiz has been submitted")
    return(this.submit())
  }

  submit(){
    fetch("/api/quiz/create", {
      method: "POST",
      body: {
        contents: this.state.contents,
        timeLimit: this.state.timeLimit,
        author: this.state.author,
        description: this.state.description,
        category: this.state.category,
        quizType: this.state.quizType,
        name: this.state.name,

      }
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
        <CardBody>
          <CardTitle className="text-center"><h1><strong>Create A Quiz</strong></h1></CardTitle>
        <CardImg top width="100%" src={QuizLogo} alt="Quiz Logo image" />
		      <br/>
          <Row></Row>
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
						      <DropdownMenu id="dropdown" value={this.state.category} name="category" onClick={this.handleCategoryInputChange.bind(this)}>
							      {Category.forEach(category=>{
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
						      <DropdownMenu id="dropdown" value={this.state.category} name="timeLimit" onClick={this.handleTimeInputChange.bind(this)}>
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
          <br></br>
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
          <Row>
            <Button onClick={this.addQuestion}>Add another Question</Button>
          </Row>
          <Row>
            <Button onClick={this.handleFormSubmit}>Submit</Button>
          </Row>

        </CardBody>
      </Card>
    </div>
  )}
};

export default Create;