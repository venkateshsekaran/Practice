import React from "react";

class Classreact extends React.Component {
  render() {
    return (
      <div className="container mt-5">
        <h3>Class Example:</h3>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header bg-secondary">
                <img
                  src="https://rukminim2.flixcart.com/image/416/416/l1whaq80/mobile/a/9/k/-original-imagdd6ryhkmktce.jpeg?q=70"
                  width="300px"
                  alt=""
                ></img>
              </div>
              <div className="card-body bg-secondary ">
                <ul className="list-group ">
                  <li className="list-group-item bg-warning">
                    <h5>REDMI Note 10T 5G</h5>
                  </li>{" "}
                  <li className="list-group-item bg-warning">
                    <h5>(Metallic Blue, 64 GB) </h5>
                  </li>
                  <li className="list-group-item bg-warning">
                    <h5>(4 GB RAM)</h5>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Classreact;
