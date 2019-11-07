import React from 'react';
import {
  Card, CardImg, CardBody, CardTitle, Button
} from 'reactstrap';

const Create = (props) => {
	
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
  );
};

export default Create;