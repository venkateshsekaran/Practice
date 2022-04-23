import React from "react";
function Contactlist(props) {
  let sethandler = (contact) => {
    props.selecteddata(contact);
  };

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
              {props.contacts.map((contact) => {
                return (
                  <tr
                    key={contact.login.uuid}
                    onMouseOver={sethandler.bind(this, contact)}
                  >
                    <td>{contact.login.uuid.slice(-4)}</td>
                    <td>{contact.name.first.toUpperCase()}</td>
                    <td>{contact.email}</td>
                    <td>
                      {contact.gender.slice(0, 1).toUpperCase() +
                        contact.gender.slice(1)}
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

export default Contactlist;
