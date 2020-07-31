import React from 'react';
import { Link } from 'react-router-dom';
class StoryList extends React.Component {
  constructor() {
    super();
    this.state = {
      stories: [],
      storyDetails: []
    };
  }

  componentDidMount = () => {
    this.fetchStories();
  };

  fetchStories = () => {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json?orderBy="$key"&limitToFirst=30')
      .then((response) => response.json())
      .then((response) => {
        this.setState({ stories: response });
        this.fetchStoryDetails();
      });
  };

  fetchStoryDetails = () => {
    this.state.stories.forEach((item) => {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)
        .then((response) => response.json())
        .then((response) => this.setState({ storyDetails: [...this.state.storyDetails, response] }));
    });
  };

  render() {
    return (
      <div>
        {this.state.storyDetails.map((item) => (
          <li key={item.id}>
            <span>{item.title}</span>
            <Link to={`/story/${item.id}`}>Comments</Link>
          </li>
        ))}
      </div>
    );
  }
}

export default StoryList;
