import React from "react";
import ToDoItems from "./ToDoItems";

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: "",
      items: [],
    };
  }

  addTask = (e) => {
    e.preventDefault();
    if (this.state.currentValue !== "") {
      let taskItem = {
        text: this.state.currentValue,
        key: Date.now(),
      };

      let tempItems = this.state.items;
      tempItems.push(taskItem);
      this.setState({ currentValue: "", items: tempItems });
    }
  };

  handleInputChange = (e) => {
    this.setState({ currentValue: e.target.value });
  };

  render() {
    return (
      <div className="toDoListContainer">
        <div className="toDoForm">
          <form onSubmit={this.addTask}>
            <input
              type="text"
              className="toDoForm__input"
              placeholder="Enter task"
              value={this.state.currentValue}
              onChange={this.handleInputChange}
            />
            <button className="toDoForm__button" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="toDoItems">
          <ToDoItems entries={this.state.items} />
        </div>
      </div>
    );
  }
}

export default ToDoList;
