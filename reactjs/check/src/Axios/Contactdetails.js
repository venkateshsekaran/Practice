import React from "react";
class Contactdetails extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <img src={this.props.selecteddata.picture.large} alt="" />
              </div>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item">
                    Name: {this.props.selecteddata.name.first}
                  </li>
                </ul>
                <ul className="list-group">
                  <li className="list-group-item">
                    Gender: {this.props.selecteddata.gender}
                  </li>
                </ul>
                <ul className="list-group">
                  <li className="list-group-item">
                    Age: {this.props.selecteddata.dob.age}
                  </li>
                </ul>
                <ul className="list-group">
                  <li className="list-group-item">
                    City: {this.props.selecteddata.location.city}
                  </li>
                </ul>
                <ul className="list-group">
                  <li className="list-group-item">
                    Country: {this.props.selecteddata.location.country}
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
export default Contactdetails;
