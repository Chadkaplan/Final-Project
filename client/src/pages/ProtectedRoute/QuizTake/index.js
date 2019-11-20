import React, { useState } from 'react';
import {Row, Col, Button, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import Question from "../../../components/Question";
import shuffle from "../../../utils/shuffle"


class QuizTake extends React.Component{
    state = {
        contents: [],
        author: "",
        quizType: "",
        quizName: "",
        quizID: "",
        timeLimit: 1000,
        category: "",
        highScore: {},
        description: "",
        timeRemaining: "",
        quizStarted: false,
        username: "",
        quizAnswers: []
    }

    fakeState = {
        quizAnswers: []
    }

    componentDidMount(){
        console.log(this.props.match.params)
        let id = this.props.match.params
        switch(id.id){
            case "5dd56f3d06885b71966e410f":
                    this.setState({
                        contents: [{
                            key: 1,
                            question: 'Which character famously said the line: "say my name"?',
                            answers: [
                                {
                                    key: 1,
                                    answer: "Walter White",
                                    correct: true
                                },
                                {
                                    key: 2,
                                    answer: "Gus Fring",
                                    correct: false
                                },
                                {
                                    key: 3,
                                    answer: "Skyler White",
                                    correct: false
                                },
                                {
                                    key: 4,
                                    answer: "Hank",
                                    correct: false
                                }
                            ]
                        },
                        {
                            key: 2,
                            question: 'Which character is in a wheelchair and dings a bell to communicate?',
                            answers: [
                                {
                                    key: 1,
                                    answer: "Hector Salamanca",
                                    correct: true
                                },
                                {
                                    key: 2,
                                    answer: "Gus Fring",
                                    correct: false
                                },
                                {
                                    key: 3,
                                    answer: "Flynn White",
                                    correct: false
                                },
                                {
                                    key: 4,
                                    answer: "Gale",
                                    correct: false
                                }
                            ]
                        },
                        {
                            key: 3,
                            question: 'Which character famously said the line: "say my name"?',
                            answers: [
                                {
                                    key: 1,
                                    answer: "Walter White",
                                    correct: true
                                },
                                {
                                    key: 2,
                                    answer: "Gus Fring",
                                    correct: false
                                },
                                {
                                    key: 3,
                                    answer: "Skyler White",
                                    correct: false
                                },
                                {
                                    key: 4,
                                    answer: "Hank",
                                    correct: false
                                }
                            ]
                        },
                        {
                            key: 4,
                            question: `Who is Walt's original partner in cooking?`,
                            answers: [
                                {
                                    key: 1,
                                    answer: "Jesse",
                                    correct: true
                                },
                                {
                                    key: 2,
                                    answer: "Mike",
                                    correct: false
                                },
                                {
                                    key: 3,
                                    answer: "Hector Salamanca",
                                    correct: false
                                },
                                {
                                    key: 4,
                                    answer: "Hank",
                                    correct: false
                                }
                            ]
                        },
                        ],
                        author: "waltW",
                        quizType: "Multiple Choice",
                        quizName: "Breaking Bad knowledge test",
                        quizID: "5dd56f3d06885b71966e410f",
                        timeLimit: "2m 00s",
                        category: "Film and TV",
                        description: "Test your knowledge of breaking bad",
                        timeRemaining: 180
                    })
            break;
        }
            
    }

    handleMCChange = event => {
        let value = event.target.value
        let name = event.target.name
        if(this.fakeState.quizAnswers.length>0){
            for(let i=0; i<this.fakeState.quizAnswers.length; i++){
                let answer = this.fakeState.quizAnswers[i]
                if(answer.name===name){
                    answer.value=value
                    return this.setState({quizAnswers: this.fakeState.quizAnswers})
                }
                else if(answer.name!==name && i===this.fakeState.quizAnswers.length-1){
                    this.fakeState.quizAnswers.push({name: name, value: value})
                    return this.setState({quizAnswers: this.fakeState.quizAnswers})
                }
            }
        }
        else{
            this.fakeState.quizAnswers.push({name: name, value: value})
            return this.setState({quizAnswers: this.fakeState.quizAnswers})
        }
    }

    timeBuilder = response => {
        let x = response.timeLimit
        let a = x.split("m")
        let b = parseInt(a[0])*60
        let m = x.split(" ")
        let z = m.split("s")
        let c = parseInt(z[1])
        return(b+c)
    }

    startQuiz = event => {
        event.preventDefault()
        console.log(this.state.contents)
        var intervalId = setInterval(()=>{
            this.setState({timeRemaining: this.state.timeRemaining-1})
        }, 1000)
        this.setState({
            quizStarted: true,
            intervalId: intervalId
        })
        console.log(this.state.quizStarted)
    }

    submit = event => {
        event.preventDefault()
        clearInterval(this.state.intervalId)
        let correct = 0
        this.state.quizAnswers.forEach(answer=>{
            if(answer.correct===true){
                correct++
            }
        })
        console.log(correct)
    }
    

    render(){
        return(
            <Card>
                <CardBody>
                <Row>
                    <Col xs="6">
                        <Row>
                            Name:
                        </Row>
                        <Row>
                            {this.state.quizName}
                        </Row>
                    </Col>
                    <Col xs="3">
                        <Row>
                            Author:
                        </Row>
                        <Row>
                            {this.state.author}
                        </Row>
                    </Col>
                    <Col xs="3">
                        <Row>
                            Time Limit:
                        </Row>
                        <Row>
                            {this.state.timeRemaining} seconds
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            Description:
                        </Row>
                        <Row>
                            {this.state.description}
                        </Row>
                    </Col>
                </Row>
                <Row>
                    {this.state.quizStarted?(
                        <div>
                        {this.state.contents.map(question => {
                            return(
                                <Question
                                    key={question.key}
                                    question={question.question}
                                    questionKey={question.key}
                                    answers={question.answers}
                                    handleMCChange={this.handleMCChange}
                                />
                            )
                        })}
                        <Button onClick={this.submit}>Submit Quiz</Button>
                        </div>
                        
                    ):(
                        <Col>
                            <Button onClick={this.startQuiz}>Take Quiz</Button>
                        </Col>
                    )}
                    
                </Row>
                </CardBody>
            </Card>
        )
    }
}

const SubmitModal = (props) => {
    const {
      buttonLabel,
      className
    } = props;
  
    const [modal, setModal] = useState(false);
  
    const toggle = () => setModal(!modal);
  
    return (
      <div>
        <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}


export default QuizTake