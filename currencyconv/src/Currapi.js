import React, { useState } from "react";
import axios from "axios";

let Currapi = () => {
  let [value, setValue] = useState(0);
  let [signvalue, setsignValue] = useState();
  let [signvalue1, setsignValue1] = useState(-1);
  let [result, setResult] = useState();

  let getHandler = (event) => {
    setValue(parseInt(event.target.value));
  };
  let signHandler1 = (event) => {
    setsignValue1(event.target.value);
  };

  let signHandler2 = (event) => {
    setsignValue(event.target.value);
  };

  let submitHandler = (event) => {
    event.preventDefault();
  };

  let convertHandler = () => {
    if (signvalue == signvalue1) {
      setResult(value);
    }
    axios
      .get(
        `https://api.frankfurter.app/latest?amount=${value}&from=${signvalue1}&to=${signvalue}`
      )
      .then((response) => {
        console.log(response.data);
        console.log(response.data.rates[signvalue]);
        setResult(response.data.rates[signvalue]);
      })
      .catch((error) => {
        console.log(error);
      });
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
                <div className="form-group d-flex ">
                  <label className="mr-auto  ">
                    <h3 className="text-white">To:</h3>
                  </label>
                </div>
                <div className="form-group d-flex ">
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
                <div className="form-group d-flex ">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Convert"
                    onClick={convertHandler}
                  />
                </div>

                <div className="text-warning">
                  <h6>
                    {result >= 0
                      ? `THE VALUE OF ENTERED AMOUNT IN ${signvalue1} is ${result}(${signvalue})`
                      : `Please Enter amount, select currency and convert`}
                  </h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Currapi;
