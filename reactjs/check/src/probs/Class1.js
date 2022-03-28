import React from "react";
import Fn2 from "./Fn2";

class Class1 extends React.Component {
  product_details = {
    name: "One Plus Nord",
    model: "CE 2 5G",
    price: 25000,
    brand: "Croma",
    delivery: "Free",
    img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQsZpcCnneOC66O5trvje4ysMbAam0D8LZM7Yd27y2j9nmw6jdSUaB5XUt2k47_KQ6L5QHil_lYjg&usqp=CAc",
  };
  render() {
    return (
      <div>
        <h6>Product Data</h6>
        <hr />
        <Fn2 details={this.product_details} />
      </div>
    );
  }
}
export default Class1;
