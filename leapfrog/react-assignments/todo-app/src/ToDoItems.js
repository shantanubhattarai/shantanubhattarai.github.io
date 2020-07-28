import React from "react";

class ToDoItems extends React.Component {
  render() {
    let toDoEntries = this.props.entries;

    let listItems = toDoEntries.map((item) => {
      return <li key={item.key}>{item.text}</li>;
    });

    return <ul className="tasksList">{listItems}</ul>;
  }
}

export default ToDoItems;
