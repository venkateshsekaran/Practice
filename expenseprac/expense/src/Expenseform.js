import React from "react";

function Expenseform({ track }) {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <table className="table table-hover ">
              <thead className="bg-dark text-white">
                <tr>
                  <th>S.No</th>
                  <th>Date</th>
                  <th>Added Amount</th>
                  <th>Withdrawn Amount</th>
                  <th>Current Balance</th>
                </tr>
              </thead>
              <tbody className="bg-white text-black">
                {track.map((exp, i) => {
                  return (
                    <tr key={i + 1}>
                      <td>{i + 1}</td>
                      <td>{exp.tdate}</td>
                      <td>{exp.addedAmount}</td>
                      <td>{exp.removeAmount}</td>
                      <td>{exp.balance}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenseform;
