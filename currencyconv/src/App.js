import React, { useState } from "react";

function App() {
  let [value, setValue] = useState(0);
  let [convvalue, setConvvalue] = useState(value);
  let [signvalue, setsignValue] = useState(-1);
  let [signvalue1, setsignValue1] = useState(-1);
  let getHandler = (event) => {
    setValue(parseInt(event.target.value));
  };
  let signHandler1 = (event) => {
    setsignValue1(event.target.value);
  };

  let signHandler2 = (event) => {
    setsignValue(event.target.value);
  };
  let convertHandler = (event) => {
    if (signvalue == "IND" && signvalue1 == "USA") {
      setConvvalue(value * 78.05);
    } else if (signvalue == "USA" && signvalue1 == "IND") {
      setConvvalue(value / 78.05);
    } else if (signvalue == signvalue1) {
      setConvvalue(value);
    }
  };
  let submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-info text-white ">
              <div className="d-flex ">
                <h3 className=" mx-auto">Currency Converter</h3>
              </div>
            </div>
            <div className="card-body bg-dark text-white">
              <form onSubmit={submitHandler}>
                <div className="form-group d-flex ">
                  <label className="mx-auto ">
                    <h3 className="text-warning">Enter Amount To Convert</h3>
                  </label>
                </div>
                <div className="form-group d-flex ">
                  <input
                    type="number"
                    placeholder="0"
                    className="mx-auto form-control"
                    onChange={getHandler}
                  />
                </div>
                <div className="form-group d-flex ">
                  <label className="mr-auto  ">
                    <h3 className="text-white">From:</h3>
                  </label>
                </div>
                <div className="form-group d-flex ">
                  <select className="form-control" onChange={signHandler1}>
                    <option value="-1">Select the currency </option>
                    <option value="IND">IND</option>
                    <option value="USA">USA</option>
                  </select>
                </div>
                <div className="form-group d-flex ">
                  <label className="mr-auto  ">
                    <h3 className="text-white">To:</h3>
                  </label>
                </div>
                <div className="form-group d-flex ">
                  <select className="form-control" onChange={signHandler2}>
                    <option value="-1">Select the currency </option>
                    <option value="IND">IND</option>
                    <option value="USA">USA</option>
                  </select>
                </div>
                <div className="form-group d-flex ">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Convert"
                    onClick={convertHandler}
                  />
                </div>
                <div className="form-group d-flex text-white ">
                  <h6>
                    The Value of Entered Amount Is{" "}
                    <span className="text-warning ">
                      {convvalue.toFixed(2)}(
                      {signvalue == "IND" ? "Rupees" : "USD"})
                    </span>
                  </h6>
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
