let Body = () => {
  let actor_name = "Allu Arjun";
  let actor_img =
    "https://filmfare.wwmindia.com/content/2020/mar/alluarjun31583760116.jpg";
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h4>{actor_name}</h4>
            </div>
            <div className="card-body mx-auto">
              <img src={actor_img} width="330px" className="mr-auto"></img>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h4>{actor_name}</h4>
            </div>
            <div className="card-body mx-auto">
              <img src={actor_img} width="330px" className="mr-auto"></img>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h4>{actor_name}</h4>
            </div>
            <div className="card-body mx-auto">
              <img src={actor_img} width="330px" className="mr-auto"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Body;
