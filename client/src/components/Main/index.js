import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const Main = (props) => {
  return (
    <div>
      <Jumbotron>
          <div>
        <h1 className="display-3 text-warning" >Quizzes</h1>
        {/* Need to position the button where we want */}
          <Button color="info">Whatever we want this button to do</Button>
      </div>
      </Jumbotron>
    </div>
  );
};

export default Main;