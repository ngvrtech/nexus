import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const FieldOptions = () => {
  const [user, setUser] = useState({
    name: "Housekeeper1",
    avatar: "https://i.pravatar.cc/300",
  });
  const [property, setProperty] = useState({
    address: "123 Main Street",
    image: "https://placehold.co/600x400",
  });
  const propertyID = useParams();

  const newServices = [
    { name: "Cleaning", link: "cleaning" },
    { name: "Inventory", link: "inventory" },
    { name: "Kichen Inventory", link: "kitchen-inventory" },
    { name: "Monthly Inspection", link: "monthly-inspection" },
    { name: "Bi-Monthly Inspection", link: "bimonthly-inspection" },
    { name: "Tri-Monthly Inspection", link: "tri-monthly-inspection" },
  ];

  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/properties/${propertyID.id}`
      );
      console.log(response.data.property);
      setProperty(response.data.property);
    } catch (err) {
      console.log(err.response || err.request || err.message);
    }
  };

  const handleReplenished = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/properties/${propertyID.id}`,
        { inventoryNeeded: [] }
      );
      fetchProperty();
    } catch (err) {
      console.log(err.response || err.request || err.message);
    }
  };

  const handleAddressed = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/properties/${propertyID.id}`,
        { attentionRequired: [] }
      );
      fetchProperty();
    } catch (err) {
      console.log(err.response || err.request || err.message);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);

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
          {property.inventoryNeeded && property.inventoryNeeded.length === 0 ? (
            <div></div>
          ) : (
            <div className="d-flex justify-content-center">
              <div
                className="alert alert-primary border-0 opacity-75"
                role="alert"
                style={{ width: "20rem" }}
              >
                <b>Inventory Needed</b>
                {property.inventoryNeeded &&
                  property.inventoryNeeded.map((item) => {
                    return <div key={item}>{item}</div>;
                  })}
                <button
                  className="btn btn-sm btn-primary mt-2 px-5"
                  onClick={handleReplenished}
                >
                  Replenished
                </button>
              </div>
            </div>
          )}
          {property.attentionRequired &&
          property.attentionRequired.length === 0 ? (
            <div></div>
          ) : (
            <div className="d-flex justify-content-center">
              <div
                className="alert alert-danger border-0 opacity-75"
                role="alert"
                style={{ width: "20rem" }}
              >
                <b>Attention Required</b>
                {property.attentionRequired &&
                  property.attentionRequired.map((item) => {
                    return <div key={item}>{item}</div>;
                  })}
                <button
                  className="btn btn-sm btn-danger mt-2 px-5"
                  onClick={handleAddressed}
                >
                  Addressed
                </button>
              </div>
            </div>
          )}
          <div>
            <div className="dropdown-center">
              <button
                className="btn btn-success mb-3 dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ width: "20rem" }}
              >
                New Service&nbsp;
              </button>
              <ul
                className="dropdown-menu text-center"
                style={{ width: "20rem" }}
              >
                {newServices.map((service) => {
                  return (
                    <li key={service.name}>
                      <a
                        className="dropdown-item"
                        href={`${propertyID.id}/${service.link}`}
                      >
                        {service.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="dropdown-center">
            <button
              className="btn btn-warning mb-4 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: "20rem" }}
            >
              Resume Service &nbsp;
            </button>
            <ul
              className="dropdown-menu text-center"
              style={{ width: "20rem" }}
            >
              <li>
                <a className="dropdown-item" href="#">
                  Inventory | Started on 2/3/24
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Cleaning Checklist | Started on 2/3/24
                </a>
              </li>
            </ul>
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
