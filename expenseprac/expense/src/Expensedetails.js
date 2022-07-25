import React, { useState } from "react";

function Expensedetails(props) {
  let { track, settrack } = props;
  let [amount, setAmount] = useState(0);
  let [bal, setbal] = useState(0);
  let date = new Date().toLocaleString();

  let submitHandler = (event) => {
    event.preventDefault();
  };

  let getAmountHandler = (event) => {
    setAmount(parseInt(event.target.value));
  };

  let addHandler = (event) => {
    setbal(bal + amount);
    settrack([
      ...track,
      {
        tdate: date,
        addedAmount: amount,
        removeAmount: "-",
        balance: bal + amount,
      },
    ]);
  };

  let removeHandler = (event) => {
    setbal(bal - amount);
    if (bal <= 0) {
      setbal(bal);
      alert("Insufficient Funds");
      settrack([
        ...track,
        {
          tdate: date,
          addedAmount: "-",
          removeAmount: "-",
          balance: bal,
        },
      ]);
    } else {
      settrack([
        ...track,
        {
          tdate: date,
          addedAmount: "-",
          removeAmount: amount,
          balance: bal - amount,
        },
      ]);
    }
  };
  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header flex align-text-center justify-content-center">
                <h4 className="d-flex text-align-center justify-content-center">
                  Expense Tracker
                </h4>
                <h6 className="d-flex text-align-center justify-content-center">
                  Current Balance = {bal}
                </h6>
              </div>
              <div className="card-body">
                <div className="form" onSubmit={submitHandler}>
                  <div className="form-group">
                    <input
                      type="number"
                      placeholder="Enter the amount"
                      className="form-control"
                      onChange={getAmountHandler}
                    />
                  </div>
                  <div className="row">
                    <div className="form-group col-md-8">
                      <input
                        type="submit"
                        value="Add"
                        className="btn btn-success"
                        onClick={addHandler}
                      />
                    </div>
                    <div className="form-group ml-auto mr-3">
                      <input
                        type="submit"
                        value="Expense"
                        className="btn btn-danger"
                        onClick={removeHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expensedetails;
