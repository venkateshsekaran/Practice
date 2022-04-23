//here we are using re-rendering  by forceupdate
/*import React from "react";
class Basic extends React.Component {
  msg = "hello";
  handler = () => {
    this.msg = "Good Morning";
    this.forceUpdate();
  };
  render() {
    console.log(this.msg);
    return (
      <div>
        <h1>Message:{this.msg}</h1>
        <button onClick={this.handler}>GM</button>
      </div>
    );
  }
}
export default Basic;*/

//re-rendering by state
import React from "react";
class Basic extends React.Component {
  state = { msg: "hello" };
  handler = () => {
    this.setState({ msg: "Good morning" });
  };
  ghandler = () => {
    this.setState({ msg: " Good Night" });
  };
  render() {
    console.log(this.state.msg);
    return (
      <div>
        <h1>Message:{this.state.msg}</h1>
        <button onClick={this.handler}>GM</button>
        <button onClick={this.ghandler}>GN</button>
      </div>
    );
  }
}
export default Basic;
