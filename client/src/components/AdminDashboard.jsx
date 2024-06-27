import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [records, setRecords] = useState({});

  const fetchRecords = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/records`);
      setRecords(response.data.records);
    } catch (err) {
      console.log(err.response || err.request || err.message);
    }
  };

  //   console.log(records);

  useEffect(() => {
    fetchRecords();
  }, []);

  const rowColor = (status) => {
    switch (status) {
      case "In-Progress":
        return "table-warning";
      case "Completed":
        return "table-success";
      case "Cancelled":
        return "table-secondary";
      case "Needs Attention":
        return "table-danger";
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center mt-4">
      <div className="row">
        <div className="col-12"></div>
      </div>
      <div className="row">
        <div className="col-12">
          <div>
            <Link to="/dashboard">
              <img style={{ width: "10rem" }} src="/ngvr-logo.png" />
            </Link>
            <span>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "15rem", background: "#293A8E" }}
              >
                Manage Users
              </button>
              <button
                type="button"
                className="btn btn-primary mx-4"
                style={{ width: "15rem", background: "#293A8E" }}
              >
                Manage Properties
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "15rem", background: "#293A8E" }}
              >
                Manage Lists
              </button>
            </span>
          </div>

          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Active Records
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Inactive Recods
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              ...
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              ...
            </div>
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              ...
            </div>
          </div>
          <div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" className="px-5">
                    Date
                  </th>
                  <th scope="col">Address</th>
                  <th scope="col">Service</th>
                  <th scope="col">Employee</th>
                  <th scope="col">Start/Completion Time</th>
                  <th scope="col">Status</th>
                  <th scope="col">Employee Notes</th>
                  <th scope="col" className="px-5"></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(records) &&
                  records.map((record, index) => {
                    const date = new Date(
                      record.startTime
                    ).toLocaleDateString();
                    const time = new Date(record.startTime).toLocaleTimeString(
                      "en-US",
                      { hour: "numeric", minute: "2-digit" }
                    );
                    const submissionTime = record.submissionTime
                      ? new Date(record.submissionTime).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "2-digit",
                          }
                        )
                      : "";
                    return (
                      <tr key={index} className={rowColor(record.status)}>
                        <td>{date}</td>
                        <td>{record.propertyAddress}</td>
                        <td>{record.service}</td>
                        <td>{record.employee}</td>
                        <td>
                          {time} - {submissionTime}
                        </td>
                        <td>{record.status}</td>
                        <td>{record.employeeComments}</td>
                        <td></td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
