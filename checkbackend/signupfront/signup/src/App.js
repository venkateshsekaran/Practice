import React, { useState } from "react";
import axios from "axios";
function App() {
  let [signDet, SetSignDet] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  let changeHandler = (event) => {
    SetSignDet({ ...signDet, [event.target.name]: event.target.value });
  };

  let submitHandler = (event) => {
    event.preventDefault();

    let details = {
      fullName: signDet.fullName,
      username: signDet.username,
      email: signDet.email,
      password: signDet.password,
    };
    axios
      .post("http://localhost:5000/app/signup", details)
      .then((response) => console.log(response.data));

    SetSignDet({ fullName: "", username: "", email: "", password: "" });
  };

  return (
    <div className="container mt-5">
      <pre>{signDet.fullName}</pre>
      <pre>{signDet.username}</pre>
      <pre>{signDet.email}</pre>
      <pre>{signDet.password}</pre>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-info text-white d-flex">
              <h3 className="mx-auto">Sign-Up Form</h3>
            </div>
            <div className="card-body bg-dark text-white ">
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Full Name"
                    onChange={changeHandler}
                    name="fullName"
                  />
                </div>
                <div className="form-group">
                  <label>User Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter User Name"
                    onChange={changeHandler}
                    name="username"
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Enter Email-Id"
                    onChange={changeHandler}
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Enter Password"
                    onChange={changeHandler}
                    name="password"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control btn btn-success"
                    type="submit"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
