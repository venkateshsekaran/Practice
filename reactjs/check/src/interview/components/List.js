import React from "react";
import axios from "axios";
import Listtable from "./Listtable";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
  }

  componentDidMount() {
    let URL = "https://jsonplaceholder.typicode.com/users";
    axios
      .get(URL)
      .then((response) => {
        return this.setState({ list: response.data });
      })
      .catch((error) => {
        return error;
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Listtable Details={this.state.list} />
          </div>
        </div>
      </div>
    );
  }
}
export default List;
