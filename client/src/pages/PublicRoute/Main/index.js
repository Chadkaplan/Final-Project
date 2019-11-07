import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import "./style.css";

const Main = (props) => {
  const jumboStyle= {
    backgroundColor: "#FFFF33",
    color: "#001f3f"
  }
  return (
    <div>
      <background>
      <Jumbotron style={jumboStyle}>
          <div>
        <h1 className="display-3 text-center" >Welcome to Maximum Quizzes</h1>
          {/* <Button color="info">Whatever we want this button to do</Button> */}
      </div>
      </Jumbotron>
      </background>
    </div>
  );
};

export default Main;