import React, { Component } from 'react';
import "./App.css";

class App extends Component {
  state = {
    users: [],
    selectedId: null,
    showDetails: false,
    currentPage: 1
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ users }));
  }

  handleDetails = id => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails,
      selectedId: id
    }));
  };

  handlePageChange = pageNumber => {
    this.setState({
      currentPage: pageNumber
    });
  };

  render() {
    const { users, currentPage } = this.state;
    const usersPerPage = 3;
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const paginatedUsers = users.slice(startIndex, endIndex);

    return (
      <div className="app">
        {paginatedUsers.map(user => (
          <div className="company-container" key={user.id}>
            <div className="company-info">
              <p>{user.company.name}</p>
              <p>Contact: {user.name}</p>
              <p>City: {user.address.city}</p>
              <p>Street: {user.address.street}</p>
            </div>
            <button0 onClick={() => this.handleDetails(user.id)}>
              View Details
            </button0>
            {this.state.showDetails && this.state.selectedId === user.id ? (
              <div className="details-container">
                <p className="details-info">Description: {user.company.catchPhrase}</p>
                <p className="details-info">Contact: {user.name}</p>
                <p className="details-info">Address: {user.address.street}, {user.address.city}</p>
                <p className="details-info">Username: {user.username}</p>
                <p className="details-info">City: {user.address.city}</p>
                <p className="details-info">Email: {user.email}</p>
                <p className="details-info">Phone: {user.phone}</p>
              </div>
            ) : null}
          </div>
        ))}
        <div>
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => this.handlePageChange(i + 1)}
              style={{ margin: '10px' }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
