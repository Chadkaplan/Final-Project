import React from 'react';
import { Jumbotron} from 'reactstrap';
import "./style.css";

const Main = (props) => {
  const jumboStyle= {
    backgroundImage: "linear-gradient(to bottom right, dodgerblue, steelblue, lightblue, dodgerblue)",
    border: "15px inset royalblue",
    color: "darkblue",
    fontFamily: "bookman",
    opacity: ".95",
    margin:"30px"
  }
  return (
    <div>
      <background>
      <Jumbotron style={jumboStyle}>
          <div>
        <h1 className="display-3 text-center" >Welcome to Maximum Quizzes</h1>
      </div>
      </Jumbotron>
      </background>
    </div>
  );
};

export default Main;