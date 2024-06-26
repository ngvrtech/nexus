import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FieldHome = () => {
  // Authenticated user information - ATTENTION NEEDED
  const [user, setUser] = useState({
    name: "hkim",
    avatar: "https://i.pravatar.cc/300",
  });

  // Stores state of all properties in company's portfolio
  const [properties, setProperties] = useState([]);
  // Stores address number from search input form
  const [searchInput, setSearchInput] = useState("");
  // Stores modified state of properties with search parameters
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Fetches all properties in company's portfolio on page load
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

  // Filter logic - takes all properties, applies filter, assigns to new state
  const searchProperties = (e) => {
    setSearchInput(e);
    const filtered = properties.filter((property) => {
      return property.address.includes(e);
    });
    setFilteredProperties(filtered);
  };

  // Renders linked property image and address onto a card
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
                {/* Filters searched properties in real-time */}
                <input
                  placeholder="Search"
                  name="search"
                  id="search"
                  type="number"
                  maxLength="50"
                  className="form-control px-5 "
                  onChange={(e) => searchProperties(e.target.value)}
                  value={searchInput}
                />
                <label htmlFor="username">Search by Street #</label>
              </div>
            </div>
          </form>
          <div className="row p-4">
            {/* Displays all or filtered rendered properties on cards */}
            {searchInput.length < 1
              ? properties.map((property) => renderPropertyCard(property))
              : filteredProperties.map((property) =>
                  renderPropertyCard(property)
                )}
          </div>
          {/* User information and logout button */}
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
