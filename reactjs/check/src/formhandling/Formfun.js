import React, { useState } from "react";
let Formfun = () => {
  let [user, setUser] = useState({ Email: "", Password: "" });
  let updateHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  let submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="container mt-5">
        <pre>{JSON.stringify(user)}</pre>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <form onSubmit={submitHandler}>
                  <div className="formgroup">
                    <label>Email :</label>
                    <input
                      type="email"
                      name="Email"
                      className="formcontrol ml-5"
                      placeholder="Email"
                      onChange={updateHandler}
                    ></input>
                    <hr />
                    <label>Password :</label>
                    <input
                      type="password"
                      name="Password"
                      className="formcontrol ml-4"
                      placeholder="Password"
                      onChange={updateHandler}
                    ></input>
                    <hr />
                    <input type="checkbox"></input> Accept terms and conditions
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
};
export default Formfun;
