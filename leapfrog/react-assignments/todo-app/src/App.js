import React from "react";
import "./assets/css/style.css";
import ToDoList from "./components/ToDoList";
// import UserList from "./components/UserList";
// import { addProps } from "./components/hoc/generic";

// const EnhancedList = addProps(UserList);
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1 className="toDoTitle">Your Tasks</h1>
        {/* <UserList /> */}
        <ToDoList />
        {/* <EnhancedList value="1234" /> */}
      </div>
    );
  }
}

export default App;
