import React from "react";
class Class2 extends React.Component {
  render() {
    return (
      <div>
        <h1>Product Component</h1>
        <pre>{JSON.stringify(this.props)}</pre>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <img src={this.props.details.img} alt="" />
                </div>
                <div className="ml-2">
                  <h5>{this.props.details.name}</h5>
                  <h5>{this.props.details.model}</h5>
                  <h5>{this.props.details.brand}</h5>
                  <h5>{this.props.details.price}</h5>
                  <h5>{this.props.details.delivery}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Class2;
