import React from 'react';
import {Row, Col, Button} from "reactstrap";


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
    }

    componentDidMount(){
        let {id} = URLSearchParams()
        fetch("/api/quiz/take/"+id, {
            method: "GET"
        }).then(response=>{
            let time = this.timeBuilder(response)
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
                timeRemaining: time
            })
        }).catch(err=>{console.log(err)})
    }



    timeBuilder(response){
        let x = response.timeLimit
        let a = x.split("m")
        let b = parseInt(a[0])*60
        let m = x.split(" ")
        let z = m.split("s")
        let c = parseInt(z[1])
        return(b+c)
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
                            {this.state.timeRemaining}
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
                        this.state.contents.map(question => {
                            return(
                                <Question
                                    question={question}
                                />
                            )
                        })
                    ):(
                        <Col>
                            <Button>Take Quiz</Button>
                        </Col>
                    )}
                    
                </Row>
            </div>
        )
    }
}

export default QuizTake