import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const FieldOptions = () => {
  // Authenticated user information - ATTENTION NEEDED
  const [user, setUser] = useState({
    name: "Housekeeper1",
    avatar: "https://i.pravatar.cc/300",
  });

  // Stores state of selected property
  const [property, setProperty] = useState({});

  const propertyID = useParams();
  const navigate = useNavigate();

  // List of services offered for each account type
  const newServices = [
    { name: "Cleaning", accountType: "housekeeping", link: "cleaning" },
    { name: "Inventory", accountType: "operations", link: "inventory" },
    {
      name: "Kichen Inventory",
      accountType: "operations",
      link: "kitchen-inventory",
    },
    {
      name: "Monthly Inspection",
      accountType: "operations",
      link: "monthly-inspection",
    },
    {
      name: "Bi-Monthly Inspection",
      accountType: "operations",
      link: "bimonthly-inspection",
    },
    {
      name: "Tri-Monthly Inspection",
      accountType: "operations",
      link: "trimonthly-inspection",
    },
  ];

  // Function to fetch data for selected property
  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/properties/${propertyID.id}`
      );
      setProperty(response.data.property);
    } catch (err) {
      console.log(err.response || err.request || err.message);
    }
  };

  // Fetches property data on page load
  useEffect(() => {
    fetchProperty();
  }, []);

  // PATCH logic to clear all items in "inventory needed" list for property
  // Reloads new property data
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

  // PATCH logic to clear all items in "attention required" list for property
  // Reloads new property data
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

  // Creates new service record with default values, redirects to service page
  const newServiceRecord = async (e, name, link) => {
    e.preventDefault();
    const defaultData = {
      date: Date(Date.now().toString()),
      propertyAddress: property.address,
      service: name,
      employee: user.name,
      startTime: Date(Date.now().toString()),
      submissionTime: undefined,
      billableHours: 0,
      status: "In-Progress",
      checklistData: [],
      reportedIssues: [],
      uploadedPhotos: [],
      employeeComments: "",
      adminNotes: "",
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/records",
        defaultData
      );
      navigate(`${link}/${response.data.record._id}`);
    } catch (err) {
      console.log(err.response || err.request || err.message);
    }
  };

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
          {/* If property needs inventory, alert is visible and displays items/button */}
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
          {/* If property requires attention, alert is visible and displays tasks/button */}
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
            {/* Dropdown new service button with list of available services */}
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
                    <li key={service.link}>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) =>
                          newServiceRecord(e, service.name, service.link)
                        }
                      >
                        {service.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* Drop down resume service button displays "In-Progress" services */}
          {/* Non-functional - ATTENTION NEEDED */}
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

export default FieldOptions;
