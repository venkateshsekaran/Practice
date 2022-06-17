import React, { useState } from "react";
import axios from "axios";

let Currapi = () => {
  let [value, setValue] = useState(0);
  let [convvalue, setConvvalue] = useState([]);
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
    axios
      .get(
        `https://free.currconv.com/api/v7/convert?q=${signvalue1}_${signvalue}&compact=ultra&apiKey=7255b06c118ad064521a`
      )
      .then((response) => {
        console.log(response.data[`${signvalue1}_${signvalue}`]);
        setConvvalue(response.data[`${signvalue1}_${signvalue}`]);
        setResult(convvalue * value);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container mt-5 mb-5">
      <pre>{value}</pre>
      <pre>{JSON.stringify(convvalue)}</pre>
      <pre>{signvalue1}</pre>
      <pre>{signvalue}</pre>
      <pre>{result}</pre>
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

                <div>
                  <h6>
                    The Value of Entered Amount Is{" "}
                    <span className="text-warning ">
                      {result}({signvalue})
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
};

export default Currapi;
