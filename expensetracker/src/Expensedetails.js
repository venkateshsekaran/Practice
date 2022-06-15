import React, { useState } from "react";
function Expensedetails(props) {
  let { track, setTrack } = props;
  let [amount, setAmount] = useState(0);
  let [bal, setBal] = useState(0);
  let todayDate = new Date().toLocaleString();
  let getAmountHandler = (event) => {
    setAmount(parseInt(event.target.value));
  };
  let addamountHandler = () => {
    setBal(bal + amount);
    setTrack([
      ...track,
      {
        tdate: todayDate,
        addamount: amount,
        removeamount: "-",
        balanceamount: bal + amount,
      },
    ]);
  };

  let removeamountHandler = () => {
    setBal(bal - amount);
    setTrack([
      ...track,
      {
        tdate: todayDate,
        addamount: "-",
        removeamount: amount,
        balanceamount: bal - amount,
      },
    ]);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3 className="d-flex text-align-center justify-content-center">
                Expense Tracker
              </h3>
            </div>

            <div className="card-body d-flex text-align-center justify-content-center form-group">
              <input
                value={amount}
                className="form-control"
                type="number"
                onChange={getAmountHandler}
              />
              <input
                type="submit"
                value="Add"
                onClick={addamountHandler}
                className="btn btn-success mx-5"
              />
              <input
                type="submit"
                value="Expense"
                className="btn btn-warning"
                onClick={removeamountHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Expensedetails;
