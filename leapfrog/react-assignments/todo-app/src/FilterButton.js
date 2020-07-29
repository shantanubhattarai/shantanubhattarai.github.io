import React from "react";

class FilterButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this.iconMap = {
      none: "list-alt",
      completed: "check-circle",
      remaining: "circle",
    };
  }

  setActive = () => {
    this.props.filterFunc(this.props.type);
    this.setState({ active: true });
  };

  render() {
    let className = "filter-box";
    if (this.state.active) className += " filter-box-active";
    return (
      <button className={className} onClick={() => this.setActive()}>
        <i
          className={"filter-icon far fa-" + this.iconMap[this.props.type]}
        ></i>
        <p className="filter-text"> {this.props.text} </p>
      </button>
    );
  }
}

export default FilterButton;
