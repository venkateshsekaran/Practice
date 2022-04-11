import React from "react";
class Contactlist extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <table className="table table-hover">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {this.props.contact.map((conc) => {
                  return (
                    <tr key={conc.login.uuid}>
                      <td>{conc.login.uuid.slice(-4)}</td>
                      <td>{conc.name.first.toUpperCase()}</td>
                      <td>{conc.email}</td>
                      <td>
                        {conc.gender.slice(0, 1).toUpperCase() +
                          conc.gender.slice(1)}
                      </td>
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
export default Contactlist;
