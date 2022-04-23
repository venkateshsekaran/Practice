import React from "react";
function Contactdetails(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <img src={props.selecteddata.picture.large} alt="" />
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  Name: {props.selecteddata.name.first}
                </li>
              </ul>
              <ul className="list-group">
                <li className="list-group-item">
                  Gender: {props.selecteddata.gender}
                </li>
              </ul>
              <ul className="list-group">
                <li className="list-group-item">
                  Age: {props.selecteddata.dob.age}
                </li>
              </ul>
              <ul className="list-group">
                <li className="list-group-item">
                  City: {props.selecteddata.location.city}
                </li>
              </ul>
              <ul className="list-group">
                <li className="list-group-item">
                  Country: {props.selecteddata.location.country}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactdetails;
