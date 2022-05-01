import React, { useState } from "react";
let Currencyconvert = () => {
  let [value, setValue] = useState("");

  let onChangeHandler = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="container mt-5">
      <div className="rows">
        <div className="col-md-8">
          <div className="card bg-dark">
            <div className="cardheader  text-white mx-auto">
              <h3>Currency Converter</h3>
            </div>
            <div className="cardbody bg-white">
              <div>
                <form>
                  <label>
                    <b>Enter Indian Currency Value: </b>
                  </label>
                  <input
                    type="number"
                    className="bg-warning mt-5"
                    onChange={onChangeHandler}
                  ></input>

                  <hr />

                  <label>
                    <b>
                      USA currency value: {(value * 0.013).toFixed(3)} Dollars
                    </b>
                  </label>
                  <hr />
                  <label>
                    <b>
                      Singapore currency value: {(value * 0.018).toFixed(3)}
                      Dollars
                    </b>
                  </label>
                </form>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Currencyconvert;
