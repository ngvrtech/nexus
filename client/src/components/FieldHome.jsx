import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const FieldHome = () => {
  const [user, setUser] = useState({
    name: "Housekeeper1",
    avatar: "https://i.pravatar.cc/300",
  });
  const [searchInput, setSearchInput] = useState("");
  const [properties, setProperties] = useState([
    { address: "123 Main Street", image: "https://placehold.co/600x400" },
    { address: "456 Church Street", image: "https://placehold.co/600x400" },
    { address: "88 Oak Lane", image: "https://placehold.co/600x400" },
    { address: "22 Franklin Road", image: "https://placehold.co/600x400" },
    { address: "11 Possum Ridge", image: "https://placehold.co/600x400" },
  ]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const searchItems = (e) => {
    setSearchInput(e);
    const filtered = properties.filter((property) => {
      return property.address.includes(e);
    });
    setFilteredProperties(filtered);
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center mt-5">
      <div className="row">
        <div className="col-12 text-center">
          <div>
            <img
              className="mb-4"
              style={{ width: "15rem" }}
              src="/ngvr-logo.png"
            />
          </div>
          <div className="mb-4">
            <img className="rounded-circle" height="35px" src={user.avatar} />
            <span className="m-3">{user.name}</span>
            <button className="btn btn-outline-secondary btn-sm">Logout</button>
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
              ? properties.map((property) => {
                  return (
                    <div
                      className="card mx-3 mb-4"
                      style={{ width: "20rem" }}
                      key={property.id}
                    >
                      <img
                        className="card-img-top pt-3"
                        // style={{ width: "" }}
                        src={property.image}
                      />
                      <h5 className="card-title m-2">{property.address}</h5>
                    </div>
                  );
                })
              : filteredProperties.map((property) => {
                  return (
                    <div
                      className="card mx-3 mb-4"
                      style={{ width: "20rem" }}
                      key={property.id}
                    >
                      <img className="card-img-top" src={property.image} />
                      <h5 className="card-title m-2">{property.address}</h5>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldHome;
