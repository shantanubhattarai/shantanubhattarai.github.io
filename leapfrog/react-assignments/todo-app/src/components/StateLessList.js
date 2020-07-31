import React from 'react';

function List(props){
  return (
  <ul>
    {
      props.list.map((user) => (
      <li key={user.id}>
        <img src={user.profileImage} alt=""/>
        <span>{user.firstName} {user.lastName}</span>
      </li>
      ))}
    </ul>
    );
}

List.defaultProps = {
  list: [],
};

export default List;