import React, { useState } from "react";
import axios from "axios";

function App() {
  let [value, setValue] = useState(0);
  let [from, setFrom] = useState("");
  let [to, setTo] = useState("");
  let [result, setResult] = useState(0);
  let valueHandler = (event) => {
    setValue(event.target.value);
  };
  let signHandler1 = (event) => {
    setFrom(event.target.value);
  };
  let signHandler2 = (event) => {
    setTo(event.target.value);
  };
  let submitHandler = (event) => {
    event.preventDefault();
  };
  let convertHandler = (event) => {
    if (from == to) {
      setResult(value);
    } else {
      axios
        .get(
          `https://api.frankfurter.app/latest?amount=${value}&from=${from}&to=${to}`
        )
        .then((res) => {
          console.log(res.data);

          setResult(res.data.rates[to]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header d-flex bg-info  ">
                <h3 className="mx-auto">Currency Converter</h3>
              </div>
              <div className="card-body">
                <div className="form" onSubmit={submitHandler}>
                  <div className="form-group">
                    <label>
                      <h6>Enter the amount here :</h6>
                    </label>

                    <input
                      type="number"
                      placeholder="0"
                      className="form-control"
                      onChange={valueHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <h6>From :</h6>
                    </label>
                    <select className="form-control" onChange={signHandler1}>
                      <option value="-1">Select the currency </option>
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                      <option value="AUD">AUD</option>
                      <option value="BGN">BGN</option>
                      <option value="BRL">BRL</option>
                      <option value="CAD">CAD</option>
                      <option value="CHF">CHF</option>
                      <option value="CNY">CNY</option>
                      <option value="PHP">PHP</option>
                      <option value="JPY">JPY</option>
                      <option value="RON">RON</option>
                      <option value="NZD">NZD</option>
                      <option value="EUR">EUR</option>
                      <option value="SGD">SGD</option>
                      <option value="TRY">TRY</option>
                      <option value="ZAR">ZAR</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <h6>To :</h6>
                    </label>

                    <select className="form-control" onChange={signHandler2}>
                      <option value="-1">Select the currency </option>
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                      <option value="AUD">AUD</option>
                      <option value="BGN">BGN</option>
                      <option value="BRL">BRL</option>
                      <option value="CAD">CAD</option>
                      <option value="CHF">CHF</option>
                      <option value="CNY">CNY</option>
                      <option value="PHP">PHP</option>
                      <option value="JPY">JPY</option>
                      <option value="RON">RON</option>
                      <option value="NZD">NZD</option>
                      <option value="EUR">EUR</option>
                      <option value="SGD">SGD</option>
                      <option value="TRY">TRY</option>
                      <option value="ZAR">ZAR</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Convert"
                      className="btn btn-success mb-5"
                      onClick={convertHandler}
                    />
                  </div>
                  {result == 0 ? (
                    <p className="font-weight-bold">
                      Please Enter the amount, choose currency and convert
                    </p>
                  ) : (
                    <p className="font-weight-bold">
                      The value of entered amount in {from} is {result}({to})
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
