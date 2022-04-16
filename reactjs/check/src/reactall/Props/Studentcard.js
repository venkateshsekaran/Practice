import React from "react";
let Studentcard = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 mr">
          <div className="card">
            <div className="card-header bg-secondary">
              <img src={props.Studentdet.image}></img>
            </div>
            <div className="card-body bg-secondary ">
              <ul className="list-group ">
                <li className="list-group-item bg-warning">
                  <h6>Name:{props.Studentdet.name}</h6>
                </li>
                <li className="list-group-item bg-warning">
                  <h6>Age:{props.Studentdet.age} </h6>
                </li>
                <li className="list-group-item bg-warning">
                  <h6>Role:{props.Studentdet.role}</h6>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Studentcard;
