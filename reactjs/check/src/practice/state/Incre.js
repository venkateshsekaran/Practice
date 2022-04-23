import React from "react";
class Incre extends React.Component {
  state = {
    counter: 1,
  };
  incHandler = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
  decHandler = () => {
    this.setState({ counter: this.state.counter - 1 });
  };
  render() {
    return (
      <div>
        <h1>Value : {this.state.counter}</h1>
        <button onClick={this.incHandler}>Add</button>
        <button onClick={this.decHandler}>Remove</button>
      </div>
    );
  }
}
export default Incre;
