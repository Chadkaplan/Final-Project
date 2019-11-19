import React from 'react';
import {Row, Col, Button} from "reactstrap";
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
        let {id} = URLSearchParams()
        fetch("/api/quiz/take/"+id, {
            method: "GET"
        }).then(response=>{
            let time = this.timeBuilder(response)
            response.contents.map(question=>{
                shuffle(question.answers)
                return question
            })
            this.setState({
                contents: response.contents,
                author: response.author,
                quizType: response.quizType,
                quizName: response.quizName,
                quizID: response._id,
                timeLimit: response.timeLimit,
                category: response.category,
                highScore: response.highScore,
                description: response.description,
                timeRemaining: time,
                intervalId: ""
            })
        }).catch(err=>{console.log(err)})
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
        var intervalId = setInterval(()=>{
            this.setState({timeRemaining: this.state.timeRemaining-1})
        }, 1000)
        this.setState({
            quizStarted: true,
            intervalId: intervalId
        })
    }

    submit = event => {
        event.preventDefault()
        clearInterval(this.state.intervalId)
        let timeTaken = this.timeBuilder(this.state) - this.state.timeRemaining;
        let correct = 0
        this.state.quizAnswers.forEach(answer=>{
            if(answer.correct===true){
                correct++
            }
        })
        fetch("/api/quiz/submit", {
            method: "POST",
            body: {
                username: this.state.username,
                category: this.state.category,
                quizID: this.state.quizID,
                correct: correct,
                time: timeTaken,
            }
        })
    }
    

    render(){
        return(
            <div>
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
                                    question={question}
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
            </div>
        )
    }
}

export default QuizTake