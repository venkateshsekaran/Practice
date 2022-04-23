import React from "react";
class Salary extends React.Component {
  state = {
    Salary: 60000,
  };
  hikehandler = (hike) => {
    this.setState({ Salary: 60000 + hike });
  };
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h5 className="bg-dark text-warning">
              Based On my hike, my salary will change
            </h5>
            <div className="card">
              <div className="card-header bg-dark text-white">
                <h1>Salary : {this.state.Salary} Rupees</h1>
              </div>
              <div className="card-body bg-secondary text-white">
                <button
                  className="mr-3 btn btn-primary"
                  onClick={this.hikehandler.bind(this, 50000)}
                >
                  Hike1
                </button>
                <button
                  className="mr-3 btn btn-success"
                  onClick={this.hikehandler.bind(this, 100000)}
                >
                  Hike2{" "}
                </button>
                <button
                  className="mr-3 btn btn-danger"
                  onClick={this.hikehandler.bind(this, 0)}
                >
                  No Hike
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Salary;
