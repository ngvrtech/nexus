import { useState } from "react";
import { Link } from "react-router-dom";

const FieldOptions = () => {
  const [user, setUser] = useState({
    name: "Housekeeper1",
    avatar: "https://i.pravatar.cc/300",
  });
  const [property, setProperty] = useState({
    address: "123 Main Street",
    image: "https://placehold.co/600x400",
  });

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center mt-4">
      <div className="row">
        <div className="col-12 text-center">
          <div>
            <Link to="/field/">
              <img style={{ width: "10rem" }} src="/ngvr-logo.png" />
            </Link>
          </div>

          <div className="row p-4">
            <div className="card mx-3" style={{ width: "20rem" }}>
              <img className="card-img-top pt-3" src={property.image} />
              <h5 className="card-title m-2">{property.address}</h5>
            </div>
          </div>
          <div>
            <button className="btn btn-success mb-3" style={{ width: "20rem" }}>
              New Service
            </button>
          </div>
          <div>
            <button className="btn btn-warning mb-5" style={{ width: "20rem" }}>
              Resume Service
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <div
              className="alert alert-primary border-0 opacity-75"
              role="alert"
              style={{ width: "20rem" }}
            >
              <b>Inventory Needed</b>
              <div>Item 1</div>
              <div>Item 2</div>
              <div>Item 3</div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div
              className="alert alert-danger border-0 opacity-75"
              role="alert"
              style={{ width: "20rem" }}
            >
              <b>Attention Required</b>
              <div>Item 1</div>
            </div>
          </div>
          <div className="mt-5 mb-4">
            <img className="rounded-circle" height="35px" src={user.avatar} />
            <span className="m-3">{user.name}</span>
            <button className="btn btn-outline-secondary btn-sm">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldOptions;
