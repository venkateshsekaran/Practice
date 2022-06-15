import React from "react";

function Expenseform({ track }) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <table className="table table-hover bg-dark text-white">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date & Time</th>
                <th>Added Amount</th>
                <th>Withdraw</th>
                <th>Balance Amount</th>
              </tr>
            </thead>
            <tbody>
              {track.map((track, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{track.tdate}</td>
                    <td>{track.addamount}</td>
                    <td>{track.removeamount}</td>
                    <td>{track.balanceamount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Expenseform;
