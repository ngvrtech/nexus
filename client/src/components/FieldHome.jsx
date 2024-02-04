import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FieldHome = () => {
  const [user, setUser] = useState({
    name: "Housekeeper1",
    avatar: "https://i.pravatar.cc/300",
  });
  const [searchInput, setSearchInput] = useState("");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const searchItems = (e) => {
    setSearchInput(e);
    const filtered = properties.filter((property) => {
      return property.address.includes(e);
    });
    setFilteredProperties(filtered);
  };

  const renderPropertyCard = (property) => (
    <div
      className="card mx-3 mb-4"
      style={{ width: "20rem" }}
      key={property.address}
    >
      <Link to={`http://localhost:5173/field/${property._id}`}>
        <img className="card-img-top pt-3" src={property.image} />
      </Link>
      <h5 className="card-title m-2">{property.address}</h5>
    </div>
  );
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/properties"
        );
        setProperties(response.data.properties);
      } catch (err) {
        console.log(err.response || err.request || err.message);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center mt-4">
      <div className="row">
        <div className="col-12 text-center">
          <div>
            <img
              className="mb-4"
              style={{ width: "10rem" }}
              src="/ngvr-logo.png"
            />
          </div>

          <form>
            <div className="d-flex justify-content-center">
              <div className="form-floating">
                <input
                  placeholder="Search"
                  name="search"
                  id="search"
                  type="number"
                  maxLength="50"
                  className="form-control px-5 "
                  onChange={(e) => searchItems(e.target.value)}
                  value={searchInput}
                />
                <label htmlFor="username">Search by Street #</label>
              </div>
            </div>
          </form>
          <div className="row p-4">
            {searchInput.length < 1
              ? properties.map((property) => renderPropertyCard(property))
              : filteredProperties.map((property) =>
                  renderPropertyCard(property)
                )}
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

export default FieldHome;
