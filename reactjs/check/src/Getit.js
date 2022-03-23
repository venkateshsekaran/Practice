import React from "react";
import Putit from "./Putit";
import Takeit from "./Takeit";
class Getit extends React.Component {
  render() {
    return (
      <div>
        "good night"
        <h1>
          <Putit />
          <Takeit />
        </h1>
        <h2>
          <Takeit />
        </h2>
      </div>
    );
  }
}
export default Getit;
