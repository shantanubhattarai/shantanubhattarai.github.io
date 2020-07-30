import React from "react";
import "./assets/css/style.css";
import ToDoList from "./components/ToDoList";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1 className="toDoTitle">Your Tasks</h1>
        <ToDoList />
      </div>
    );
  }
}

export default App;
