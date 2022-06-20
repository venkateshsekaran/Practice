import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      username: "",
      email: "",
      password: "",
    };
    this.changeFullName = this.changeFullName.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  changeFullName(event) {
    this.setState({ fullName: event.target.value });
  }
  changeUsername(event) {
    this.setState({ username: event.target.value });
  }
  changeEmail(event) {
    this.setState({ email: event.target.value });
  }
  changePassword(event) {
    this.setState({ password: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();

    const registered = {
      fullName: this.state.fullName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    console.log(registered);
    axios
      .post("http://localhost:4000/app/signup", registered)
      .then((response) => console.log(response.data));

    this.setState({
      fullName: "",
      username: "",
      email: "",
      password: "",
    });
  }
  render() {
    return (
      <div className="container mt-5 ">
        <pre>{this.state.fullName}</pre>
        <pre>{this.state.username}</pre>
        <pre>{this.state.email}</pre>
        <pre>{this.state.password}</pre>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 d-flex ">
            <div className="card">
              <div className="card-header bg-info text-white ">
                <div className="d-flex ">
                  <h3 className=" mx-auto">Sign-Up Form</h3>
                </div>
              </div>
              <div className="card-body bg-dark text-white">
                <div className="form-div">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="FullName"
                        onChange={this.changeFullName}
                        value={this.state.fullName}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Username"
                        onChange={this.changeUsername}
                        value={this.state.username}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        onChange={this.changeEmail}
                        value={this.state.email}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        onChange={this.changePassword}
                        value={this.state.password}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        className="btn btn-danger btn-block"
                        value="submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
