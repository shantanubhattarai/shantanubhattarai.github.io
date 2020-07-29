import React from "react";

class ToDoItems extends React.Component {
  delete = (key) => {
    this.props.delete(key);
  };

  complete = (key) => {
    this.props.complete(key);
  };

  render() {
    let toDoEntries = this.props.entries;

    let listItems = toDoEntries.map((item) => {
      let className = "clearFix";
      if (item.completed) className += " checked";

      return (
        <li key={item.key} className={className}>
          <input
            type="checkBox"
            className="todoCheck pullLeft"
            onChange={() => this.complete(item.key)}
            checked={item.completed ? true : false}
          />
          <p className="todoText pullLeft">{item.text}</p>
          <button className="deleteBtn" onClick={() => this.delete(item.key)}>
            Delete
          </button>
        </li>
      );
    });

    return <ul className="tasksList">{listItems}</ul>;
  }
}

export default ToDoItems;
