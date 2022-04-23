import React from "react";
import { incrAction, decrAction } from "./product/Product.action";
import { useDispatch, useSelector } from "react-redux";
const Product = () => {
  let product = useSelector((state) => {
    return state.product;
  });
  let dispatch = useDispatch();
  let incrHandler = () => {
    dispatch(incrAction());
  };
  let decrHandler = () => {
    dispatch(decrAction());
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <table className="table table-hover">
            <thead className="bg-warning">
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="bg-info ">
              <tr>
                <td>
                  <b>{product.name}</b>
                </td>
                <td>
                  <img src={product.img} width="100px"></img>
                </td>
                <td>
                  <b>{product.price}</b>
                </td>
                <td>
                  <button onClick={decrHandler}>-</button>
                  <b> {product.qty}</b>
                  <button onClick={incrHandler}>+</button>
                </td>
                <td>
                  <b>{product.price * product.qty}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export { Product };
