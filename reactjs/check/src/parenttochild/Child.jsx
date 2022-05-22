import React, { Component } from "react";
import Parent from "./Parent";
class Child extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: "" };

    this.methodHandler = (event) => {
      this.setState({ msg: event.target.value });
      return "Email:" + this.state.msg;
    };
    this.submitHandler = (event) => {
      event.preventDefault();
      console.log("Email:" + this.state.msg);
    };
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3>Form</h3>
                </div>
                <div className="card-body">
                  <form>
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="enter the mail"
                      onChange={this.methodHandler}
                    />
                    <button onClick={this.submitHandler}>submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Parent email={this.state.msg} />
      </div>
    );
  }
}

export default Child;
