import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDataAction } from "./User.action";
const User = () => {
  let dispatch = useDispatch();
  let users = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    //dispatch an action
    dispatch(loadDataAction());
  }, []);
  return (
    <div>
      <h1>USer Data</h1>
      <pre>{JSON.stringify(users)}</pre>
      <div className="container">
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
                {users.users.map((det) => {
                  return (
                    <tr>
                      <td>{det.id}</td>
                      <td>{det.name}</td>
                      <td>{det.email}</td>
                      <td>{det.address.city}</td>
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
};

export default User;
