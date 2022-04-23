import React, { useState } from "react";
let Form = () => {
  let [user, setUser] = useState({
    Email: "",
    Password: "",
  });
  let updateHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  let submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-secondary text-white">
              <h2>Login</h2>
            </div>
            <div className="card-body bg-warning">
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label>
                    <b>Email:</b>
                  </label>
                  <input
                    type="email"
                    name="Email"
                    placeholder=" Type your Email id here"
                    className="form-control"
                    onChange={updateHandler}
                  ></input>
                  <hr />
                  <label>
                    <b>Password:</b>
                  </label>
                  <input
                    type="password"
                    name="Password"
                    placeholder=" Type your Password here"
                    className="form-control"
                    onChange={updateHandler}
                  ></input>{" "}
                  <hr />
                  <input type="checkbox"></input>
                  <b>Accept Terms & Conditions</b>
                  <hr />
                  <button type="submit" className="btn btn-success  ">
                    <b> Login</b>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-secondary text-white">
              <h2>User Details</h2>
            </div>
            <div className="card-body bg-warning">
              <div className="list-group">
                <h4 className="list-group-item">Email id: {user.Email}</h4>
                <h4 className="list-group-item">Password: {user.Password}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
