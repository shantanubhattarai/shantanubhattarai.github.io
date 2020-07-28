import React from "react";
import "./App.css";
import ToDoList from "./ToDoList";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ToDoList />
      </div>
    );
  }
}

export default App;
