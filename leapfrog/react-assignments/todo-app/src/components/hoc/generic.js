import React from "react";

const addProps = (Component) => {
  class WrapperComponent extends React.Component {
    constructor(props) {
      super(props);
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
          {this.state.isLoading && <p>Loading...</p>}
          <Component {...this.props} list={this.state.list}></Component>
        </div>
      );
    }
  }

  return WrapperComponent;
};

export { addProps };
