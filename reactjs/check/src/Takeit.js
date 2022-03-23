import React from "react";
import Takeit1 from "./Takeit1";
class Takeit extends React.Component {
  hero = "vijay";
  actress = "sridivya";
  render() {
    return (
      <div>
        <h3>
          Actor:{this.hero}
          Heroine: {this.actress}
        </h3>
        <h4>
          <Takeit1 />
        </h4>
      </div>
    );
  }
}
export default Takeit;
