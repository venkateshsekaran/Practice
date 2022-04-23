import React, { useState } from "react";

function Product() {
  let [product, setProduct] = useState({
    Name: "Apple",
    Price: 50000,
    Qty: 1,
  });
  let incrHandler = () => {
    setProduct({ ...product, Qty: product.Qty + 1 });
  };
  let decrHandler = () => {
    setProduct({ ...product, Qty: product.Qty - 1 });
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-11">
          <table className="table table-hover">
            <thead className="bg-dark text-white">
              <tr>
                <td>Product Name</td>
                <td>Price</td>
                <td>Qty</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{product.Name}</td>
                <td>{product.Price}</td>
                <td>
                  <i onClick={decrHandler} className="fa fa-minus-circle"></i>
                  {product.Qty}
                  <i onClick={incrHandler} className="fa fa-plus-circle"></i>
                </td>
                <td>{product.Price * product.Qty}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Product;
