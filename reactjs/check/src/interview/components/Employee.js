import React from "react";

class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = { detail: "" };
  }
  updateHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSaveHandler = (event) => {
    event.preventDefault();
  };
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div col-md-6>
            <div className="card">
              <div className="card-header bg-dark text-white">
                <h3>Employee Form</h3>
              </div>
              <div className="card-body bg-warning">
                <form onSubmit={this.onSaveHandler}>
                  <label>
                    <b>Employee Name:</b>
                  </label>
                  <input
                    type="text"
                    className="ml-2"
                    placeholder="Enter Your Name"
                    name="empname"
                    onChange={this.updateHandler}
                  ></input>
                  <hr />
                  <label>
                    <b>Home Address:</b>
                  </label>
                  <br />
                  <label>
                    <b>Line 1:</b>
                  </label>
                  <input
                    type="text"
                    className="ml-2"
                    placeholder="Enter Your Address Line 1"
                    name="line1"
                    onChange={this.updateHandler}
                  ></input>
                  <hr />
                  <label>
                    <b>Line 2:</b>
                  </label>
                  <input
                    type="text"
                    className="ml-2"
                    placeholder="Enter Your Address Line 2"
                    name="line2"
                    onChange={this.updateHandler}
                  ></input>
                  <hr />
                  <label>
                    <b>City:</b>
                  </label>
                  <input
                    type="text"
                    className="ml-3"
                    placeholder="Enter your city"
                    name="city"
                    onChange={this.updateHandler}
                  ></input>
                  <hr />
                  <label>
                    <b>State:</b>
                  </label>
                  <input
                    type="text"
                    className="ml-2"
                    name="state"
                    placeholder="Enter your State"
                    onChange={this.updateHandler}
                  ></input>
                  <hr />
                  <button className="btn btn-success">Save</button>
                </form>
              </div>
            </div>
          </div>
          <div col-md-6 className="ml-5">
            <table className="table table-hover">
              <thead className="bg-dark text-white">
                <tr>
                  <th>Employee Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>
                    <button className="btn btn-warning">Edit</button>
                  </th>
                  <th>
                    <button className="btn btn-danger">Delete</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.empname}</td>
                  <td>{this.state.line1}</td>
                  <td>{this.state.city}</td>
                  <td>{this.state.state}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default Employee;
