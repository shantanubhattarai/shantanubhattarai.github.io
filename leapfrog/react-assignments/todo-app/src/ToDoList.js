import React from "react";
import ToDoItems from "./ToDoItems";
import FilterButton from "./FilterButton";

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: "",
      items: [],
      displayItems: [],
      filter: "none",
    };
  }

  addTask = (e) => {
    e.preventDefault();
    if (this.state.currentValue !== "") {
      let taskItem = {
        text: this.state.currentValue,
        key: Date.now(),
        completed: false,
      };

      let tempItems = this.state.items;
      tempItems.push(taskItem);
      this.setState({
        currentValue: "",
        items: tempItems,
        displayItems: tempItems,
      });
    }
  };

  handleInputChange = (e) => {
    this.setState({ currentValue: e.target.value });
  };

  deleteItem = (key) => {
    let filteredItems = this.state.items.filter((item) => {
      return item.key !== key;
    });

    this.setState({ items: filteredItems });
  };

  handleCompleted = (key) => {
    let items = this.state.items;
    let itemIdx = items.findIndex((task) => task.key === key);
    let item = items[itemIdx];

    items[itemIdx] = { ...item, completed: !item.completed };
    let displayItems = this.checkFilters();
    this.setState({ items, displayItems });
  };

  filterOnSearch = (e) => {
    let tempDisplayItems = this.checkFilters();
    if (!e.target.value || e.target.value === "" || e.target.value === " ") {
      this.setState({ displayItems: [...this.state.items] });
    } else {
      let searchQuery = e.target.value.toLowerCase();
      tempDisplayItems = tempDisplayItems.filter((item) => {
        let searchValue = item.text.toLowerCase();
        return searchValue.indexOf(searchQuery) !== -1;
      });
      this.setState({ displayItems: tempDisplayItems });
    }
  };

  checkFilters = () => {
    let itemsToDisplay = [...this.state.items];
    if (this.state.filter === "completed") {
      itemsToDisplay = this.state.items.filter((item) => {
        return item.completed;
      });
    } else if (this.state.filter === "remaining") {
      itemsToDisplay = this.state.items.filter((item) => {
        return !item.completed;
      });
    }

    return itemsToDisplay;
  };

  setFilter = (value) => {
    this.setState({ filter: value }, () => {
      let itemsToDisplay = this.checkFilters();
      this.setState({ displayItems: itemsToDisplay });
    });
  };

  render() {
    return (
      <div className="toDoListContainer">
        <div className="toDoSearch">
          <input
            type="text"
            className="searchBar"
            placeholder="Search here"
            onChange={this.filterOnSearch}
          />
        </div>
        <div className="toDoFilters">
          <h3>Filter your tasks</h3>
          <FilterButton
            filterFunc={this.setFilter}
            type="none"
            text="All Items"
          />
          <FilterButton
            filterFunc={this.setFilter}
            type="completed"
            text="Completed"
          />
          <FilterButton
            filterFunc={this.setFilter}
            type="remaining"
            text="Remaining"
          />
        </div>
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
          <ToDoItems
            entries={this.state.displayItems}
            delete={this.deleteItem}
            complete={this.handleCompleted}
          />
        </div>
      </div>
    );
  }
}

export default ToDoList;
