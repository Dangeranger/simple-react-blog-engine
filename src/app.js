import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    const postRequest = fetch("https://jsonplaceholder.typicode.com/posts")
    const authorRequest = fetch("https://jsonplaceholder.typicode.com/users")
    Promise.all([postRequest, authorRequest])
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(objects => {
        const [posts, users] = objects;
        const postsWithUser = posts.map(post => {
          const user = users.find(elem => elem.id === post.userId)
          post.user = user;
          return post;
        })
        return postsWithUser
      })
      .then(completePosts => {
        this.setState({
          items: completePosts,
          isLoaded: true
        })
      })
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(this.state.items);
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <h3>{item.user.name}</h3>
              <h4>{item.user.email}</h4>
            </li>
          ))}
        </ul>
      );
    }
  }
}

