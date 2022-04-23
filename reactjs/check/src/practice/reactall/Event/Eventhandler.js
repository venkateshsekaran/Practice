import React from "react";
class Eventhandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { msg: "Welcome" };
  }
  gmhandler = () => {
    this.setState({ msg: "Good Morning" });
  };
  gnhandler = () => {
    this.setState({ msg: "Good Night" });
  };

  render() {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header bg-info">
                <h3>Hello {this.state.msg}</h3>
              </div>
              <div className="card-body bg-secondary mx-auto">
                <button onClick={this.gmhandler} className="btn btn-success ">
                  GM
                </button>
                <button
                  onClick={this.gnhandler}
                  className="btn btn-danger ml-5"
                >
                  GN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Eventhandler;
