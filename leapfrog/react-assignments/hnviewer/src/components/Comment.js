import React from 'react';

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      commentDetails: {},
      comments: []
    };
  }

  componentDidMount = () => {
    this.fetchCommentDetails(this.props.id);
  };

  fetchCommentDetails = (id) => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((response) => response.json())
      .then((response) => this.setState({ commentDetails: response }))
      .then(() => this.fetchSubComments());
  };

  fetchSubComments = () => {
    if (this.state.commentDetails.kids) {
      this.state.commentDetails.kids.forEach((id) => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((response) => response.json())
          .then((response) => this.setState({ comments: [...this.state.comments, response] }));
      });
    }
  };

  render() {
    return (
      <li key={this.props.id}>
        {this.state.commentDetails.deleted ? 'deleted' : ''}
        <span dangerouslySetInnerHTML={{ __html: this.state.commentDetails.text }}></span>
        <ul>
          {this.state.comments.map((item) => (
            <Comment key={item.id} id={item.id} />
          ))}
        </ul>
      </li>
    );
  }
}

export default Comment;
