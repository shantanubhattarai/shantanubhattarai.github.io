import React from "react";
import StateLessList from "./StateLessList";

class UserList extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      isLoading: false,
    };
  }

  fetchUserList = () => {
    this.setState({
      isLoading: true,
    });
    fetch("https://mock-io.herokuapp.com/users")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          list: response,
          isLoading: false,
        });
      });
  };

  componentDidMount = () => {
    this.fetchUserList();
  };
  render() {
    return (
      <div>
        <StateLessList list={this.state.list} />
      </div>
    );
  }
}

export default UserList;
