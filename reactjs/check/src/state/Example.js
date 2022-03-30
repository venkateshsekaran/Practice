import React from "react";
class Example extends React.Component {
  state = {
    product_Name: "Realme_9_Pro",
    image:
      "https://rukminim2.flixcart.com/image/312/312/kzogn0w0/mobile/9/u/s/-original-imagbmf2fttpg4xb.jpeg?q=70",
    price: 17999,
    qty: 1,
  };
  incHandler = () => {
    this.setState({ qty: this.state.qty + 1 });
  };
  decHandler = () => {
    this.setState({ qty: this.state.qty - 1 });
  };
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <table className="table table-hover">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Product Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="bg-secondary text-white">
                <tr>
                  <td>{this.state.product_Name}</td>
                  <td>
                    <img src={this.state.image} height="100px"></img>
                  </td>
                  <td>{this.state.price}</td>
                  <td>
                    <i
                      className="fa fa-plus-circle mr-2"
                      onClick={this.incHandler}
                    ></i>
                    {this.state.qty}
                    <i
                      className="fa fa-minus-circle ml-2"
                      onClick={this.decHandler}
                    ></i>
                  </td>
                  <td>{this.state.price * this.state.qty}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default Example;
