import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { gmAction, gnAction } from "../Redux1/Message/Message.action";
const Message = () => {
  let dispatch = useDispatch();
  let message = useSelector((state) => {
    return state.message;
  });

  let gmHandler = () => {
    dispatch(gmAction());
  };
  let gnHandler = () => {
    dispatch(gnAction());
  };
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-info">
              <h3> Message:{message.message}</h3>
            </div>
            <div className="card-body bg-secondary mx-auto">
              <button onClick={gmHandler} className="btn btn-success ">
                GM
              </button>
              <button onClick={gnHandler} className="btn btn-danger ml-5">
                GN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Message;
