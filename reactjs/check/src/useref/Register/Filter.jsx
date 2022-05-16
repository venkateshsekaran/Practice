import React from "react";
import axios from "axios";
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [], users: [] };
  }

  componentDidMount() {
    let Url = "https://jsonplaceholder.typicode.com/users";
    axios
      .get(Url)
      .then((response) => {
        return this.setState({ users: response.data, contacts: response.data });
      })
      .catch((error) => {
        return error;
      });
  }

  filter = (event) => {
    if (event.target.value !== "") {
      let result = this.state.users.filter((sort) => {
        return sort.name.toLowerCase().includes(event.target.value);
      });
      return this.setState({ contacts: result });
    } else {
      return this.setState({ contacts: this.state.users });
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <h3>Filter</h3>
            <input type="text" placeholder="search" onChange={this.filter} />
            <table className="table table-hover">
              <thead className="bg-dark text-white">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {this.state.contacts.length > 0 ? (
                  this.state.contacts.map((contacts) => {
                    return (
                      <tr key={contacts.id}>
                        <td>{contacts.id}</td>
                        <td>{contacts.name}</td>
                        <td>{contacts.email}</td>
                        <td>{contacts.address.city}</td>
                      </tr>
                    );
                  })
                ) : (
                  <h3>Item not found</h3>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
