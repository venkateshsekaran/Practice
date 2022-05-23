import axios from "axios";
import React from "react";
import Contactlist from ".//Contactlist";
import Contactdetails from "./Contactdetails";

class Reactcontact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [], selectcontact: [] };
  }
  userselect = (contact) => {
    this.setState({ selectcontact: contact });
  };
  componentDidMount() {
    let Url =
      "https://gist.githubusercontent.com/narasimhareddyprostack/7e344f346f47bc53a889d78b5258d0c9/raw/56d531cb936d9c79e2417e5d0e5d8c9c876800f2/contactlist";
    axios
      .get(Url)
      .then((response) => {
        return this.setState({ contacts: response.data });
      })
      .catch((error) => {
        return error;
      });
  }
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            {this.state.contacts.length > 0 ? (
              <>
                <Contactlist
                  contacts={this.state.contacts}
                  selecteddata={this.userselect}
                />
              </>
            ) : null}
          </div>
          <div className="col-md-4">
            {Object.keys(this.state.selectcontact).length > 0 ? (
              <>
                
                <Contactdetails selecteddata={this.state.selectcontact} />
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default Reactcontact;
