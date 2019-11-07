import React from 'react';
import {
  Card, CardImg, CardBody, CardTitle, Button
} from 'reactstrap';

class Create extends React.Component {
  state = {
    contents: [{
      key: 0,
      question: "",
      answers: [{
        key: 0,
        answer: "",
        correct: true
      },
      {
        key: 1,
        answer: "",
        correct: false
      }
    ]
    }]

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
        </CardBody>
      </Card>
    </div>
  )}
};

export default Create;