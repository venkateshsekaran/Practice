let Fn2 = (props) => {
  return (
    <div>
      <h1>Product Component</h1>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <img src={props.details.img} alt="" />
              </div>
              <div className="card-body">
                <h5>{props.details.name}</h5>
                <h5>{props.details.model}</h5>
                <h5>{props.details.brand}</h5>
                <h5>{props.details.price}</h5>
                <h5>{props.details.delivery}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Fn2;
