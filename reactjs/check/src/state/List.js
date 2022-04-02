import React from "react";
import { details } from "../state/Emp";
class List extends React.Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <table className="table table-hover">
              <thead className="bg-dark text-white">
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody className="bg-secondary text-white">
                {details.map((employees) => {
                  return (
                    <tr key={employees.id}>
                      <td>{employees.id}</td>
                      <td>{employees.first_name}</td>
                      <td>{employees.last_name} </td>
                      <td>{employees.email} </td>
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
}
export default List;
