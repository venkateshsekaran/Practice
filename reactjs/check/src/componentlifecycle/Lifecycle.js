import React from "react";
class Lifecycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTime: new Date().toLocaleTimeString() };
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="column md-6">
            <div className="card">
              <div className="card-header bg-dark text-white">
                <h4>Time -- {this.state.currentTime}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Lifecycle;
