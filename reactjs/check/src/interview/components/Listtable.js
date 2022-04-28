import React, { useState } from "react";
let Listtable = (props) => {
  const [name, setName] = useState("");

  const [foundUsers, setFoundUsers] = useState(props.Details);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = props.Details.filter((user) => {
        return user.name.toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(props.Details);
    }

    setName(keyword);
  };

  return (
    <div className="container mt-5 ">
      <h3>Filter:</h3>
      <input
        type="search"
        onChange={filter}
        value={name}
        placeholder="Search"
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <table className="table table-hover">
              <thead className="bg-dark text-white">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {foundUsers.length > 0 ? (
                  foundUsers.map((user) => (
                    <tr>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.address.city}</td>
                    </tr>
                  ))
                ) : (
                  <h1>No results found!</h1>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Listtable;
