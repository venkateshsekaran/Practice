import React, { useRef } from "react";

function Signup1() {
  let buttonEl = useRef(null);
  let passwordEl = useRef(null);
  let buttonHandler = (event) => {
    buttonEl.current.disabled = !event.target.checked;
  };
  let passwordHandler = (event) => {
    if (passwordEl.current.type === "password") {
      passwordEl.current.type = "text";
    } else {
      passwordEl.current.type = "password";
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Registration Page</h5>
            </div>
            <div className="card-body">
              <div>
                <form className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                  />
                </form>
              </div>
              <div>
                <form className="form-group">
                  <input
                    type="number"
                    placeholder="Mobile Number"
                    className="form-control"
                  />
                </form>
              </div>
              <div>
                <form className="form-group">
                  <input
                    ref={passwordEl}
                    type="password"
                    placeholder="Password"
                    className="form-control"
                  />
                </form>
              </div>
              <i className="fa fa-eye " onClick={passwordHandler}></i>
              <div>
                <form className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={buttonHandler}
                  />
                  <span style={{ color: "green" }}>
                    Accept Terms and Conditions
                  </span>
                </form>
              </div>
              <input
                ref={buttonEl}
                type="button"
                className="btn btn-success"
                value="Sign-up"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup1;
