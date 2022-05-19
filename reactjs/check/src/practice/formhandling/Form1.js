import React from "react";
class Form1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { Email: "", Password: "" },
    };
  }
  /* emailHandler = (event) => {
    this.setState({ user: { Email: event.target.value } });
  };
  passHandler = (event) => {
    this.setState({ Password: event.target.value });
  };*/
  updateHandler = (event) => {
    this.setState({
      user: { ...this.state.user, [event.target.name]: event.target.value },
    });
  };
  submitHandler = (event) => {
    event.preventDefault();
    alert("hello");
  };

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state)}</pre>
        <div className="container mt-5">
          <h3>Email:{this.state.Email}</h3>
          <h3>Password: {this.state.Password}</h3>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <form onSubmit={this.submitHandler}>
                    <div className="formgroup">
                      <label>Email :</label>
                      <input
                        type="email"
                        name="Email"
                        className="formcontrol ml-5"
                        placeholder="Email"
                        onChange={this.updateHandler}
                        value={this.state.user.name}
                      ></input>
                      <hr />
                      <label>Password :</label>
                      <input
                        type="password"
                        name="Password"
                        className="formcontrol ml-4"
                        placeholder="Password"
                        onChange={this.updateHandler}
                      ></input>
                      <hr />
                      <input type="checkbox"></input> Accept terms and
                      conditions
                      <hr />
                      <button type="submit" className="btn btn-success">
                        Login
                      </button>
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
export default Form1;
