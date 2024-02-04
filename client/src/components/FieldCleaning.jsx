import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const FieldCleaningChecklist = () => {
  const propertyID = useParams();
  const [user, setUser] = useState({
    name: "Housekeeper1",
    avatar: "https://i.pravatar.cc/300",
  });
  const [property, setProperty] = useState({
    address: "123 Main Street",
    image: "https://placehold.co/600x400",
  });
  const [cleaningChecklist, setCleaningChecklist] = useState([]);

  const [certifiedChecklist, setCertifiedChecklist] = useState([
    { name: "Furniture in their correct location.", status: false },
    { name: "Everything appears presentable.", status: false },
    { name: "The house is ready for guests.", status: false },
  ]);
  const [cleaningChecklistStatus, setCleaningChecklistStatus] = useState(false);
  const [certifiedChecklistStatus, setCertifiedChecklistStatus] =
    useState(false);
  const [reports, setReports] = useState({
    missingStatus: false,
    damagesStatus: false,
  });
  const [reportsStatus, setReportsStatus] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [comments, setComments] = useState("");
  const [missingItems, setMissingItems] = useState({
    status: false,
    notes: "",
  });
  const [damaged, setDamaged] = useState({
    status: false,
    notes: "",
  });

  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/properties/${propertyID.id}`
      );
      console.log(response.data.property);
      setProperty(response.data.property);
      setCleaningChecklist(response.data.property.cleaningChecklist);
    } catch (err) {
      console.log(err.response || err.request || err.message);
    }
  };

  const handleSave = () => {
    setSaveStatus(false);
  };

  const handlePhotos = () => {
    setSaveStatus(true);
  };

  const handleMissingRadio = (e) => {
    setMissingItems({ ...missingItems, status: e.target.value });
    setReports({ missingStatus: true });
    setReportsStatus(reports.damageStatus === true ? true : false);
    setSaveStatus(true);
  };

  const handleDamagedRadio = (e) => {
    setDamaged({ ...damaged, status: e.target.value });
    setReports({ damagesStatus: true });
    setReportsStatus(reports.missingStatus === true ? true : false);

    setSaveStatus(true);
  };

  const handleMissingItems = (e) => {
    setMissingItems({ ...missingItems, notes: e.target.value });
    setSaveStatus(true);
  };

  const handleComments = (e) => {
    setComments(e.target.value);
    setSaveStatus(true);
  };

  const confirmDelete = () =>
    window.confirm("Are you sure you want to delete this service?");

  const getAlertClass = (status) => {
    const classMap = {
      false: "alert-secondary",
      true: "alert-success",
    };
    return classMap[status] || "alert-secondary";
  };

  const getNextStatus = (currentStatus) => {
    const statusMap = {
      false: true,
      true: false,
    };
    return statusMap[currentStatus] || false;
  };

  const handleClick = (name, status) => {
    const updatedCleaningChecklist = cleaningChecklist.map((task) =>
      task.name === name ? { ...task, status: getNextStatus(status) } : task
    );
    setCleaningChecklist(updatedCleaningChecklist);

    const filtered = updatedCleaningChecklist.filter((task) => {
      return task.status === false;
    });
    setCleaningChecklistStatus(filtered.length < 1 ? true : false);
    setSaveStatus(true);
  };

  const handleCertifiedClick = (name, status) => {
    const updatedCertifiedChecklist = certifiedChecklist.map((task) =>
      task.name === name ? { ...task, status: getNextStatus(status) } : task
    );
    setCertifiedChecklist(updatedCertifiedChecklist);
    const filtered = updatedCertifiedChecklist.filter((task) => {
      return task.status === false;
    });
    setCertifiedChecklistStatus(filtered.length < 1 ? true : false);
    setSaveStatus(true);
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
              <div className="mt-2">{property.address}</div>
              <h1 className="card-title" style={{ color: "#293A8E" }}>
                Cleaning Checklist
              </h1>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="col-11">
              {cleaningChecklist.map((task) => {
                return (
                  <div
                    className={`alert ${getAlertClass(task.status)} m-3 p-2`}
                    key={task.name}
                    style={{ width: "20rem" }}
                  >
                    <div className="row">
                      <div
                        className="col d-flex justify-content-start mx-4"
                        role="button"
                        onClick={handleClick.bind(null, task.name, task.status)}
                      >
                        {task.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <form>
              {/* Missing Items Report */}
              <div
                className={`alert ${
                  missingItems.status ? "alert-success" : "alert-secondary"
                } m-3 p-2`}
                style={{ width: "20rem" }}
              >
                <h5>Are there items missing?</h5>
                <div className="form-check form-check-inline px-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="false"
                    onChange={handleMissingRadio}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    No
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="true"
                    onChange={handleMissingRadio}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Yes
                  </label>
                </div>
              </div>
              <div className="form-floating my-3">
                <textarea
                  placeholder="Missing Items"
                  name="missing"
                  id="missing"
                  className="form-control align-top"
                  style={{ width: "20rem", height: "9rem" }}
                  onChange={handleMissingItems}
                  value={missingItems.notes}
                />
                <label>Notes for Missing Items</label>
              </div>
              {/* Damages Report */}
              <div
                className={`alert ${
                  damaged.status ? "alert-success" : "alert-secondary"
                } m-3 p-2`}
                style={{ width: "20rem" }}
              >
                <h5>Is anything damaged?</h5>
                <div className="form-check form-check-inline px-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="damageRadioOptions"
                    id="inlineRadio1"
                    value="false"
                    onChange={handleDamagedRadio}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    No
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="damageRadioOptions"
                    id="inlineRadio2"
                    value="true"
                    onChange={handleDamagedRadio}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Yes
                  </label>
                </div>
              </div>

              <div className="form-floating my-3">
                <textarea
                  placeholder="Missing Items"
                  name="missing"
                  id="missing"
                  className="form-control align-top"
                  style={{ width: "20rem", height: "9rem" }}
                  onChange={handleMissingItems}
                  value={missingItems.notes}
                />
                <label>Notes for Damages</label>
              </div>
              {/* Photo Upload Input */}
              <div className="my-3">
                <label htmlFor="formFileMultiple" className="form-label">
                  <b>Upload Photo(s)</b>
                </label>
                <input
                  multiple
                  className="form-control"
                  type="file"
                  id="formFileMultiple"
                  style={{ width: "20rem" }}
                  onChange={handlePhotos}
                />
              </div>
              {/* Comment Textarea */}
              <div className="form-floating my-3">
                <textarea
                  placeholder="Comments"
                  name="comments"
                  id="comments"
                  className="form-control align-top"
                  style={{ width: "20rem", height: "9rem" }}
                  onChange={handleComments}
                  value={comments}
                />
                <label>Comments</label>
              </div>
            </form>
          </div>
          {/* Certified Checklist */}
          <div className="d-flex justify-content-center">
            <div className="col-11">
              {certifiedChecklist.map((task) => {
                return (
                  <div
                    className={`alert ${getAlertClass(task.status)} m-3 p-2`}
                    key={task.name}
                    style={{ width: "20rem" }}
                  >
                    <div className="row">
                      <div
                        className="col d-flex justify-content-start mx-4"
                        role="button"
                        onClick={handleCertifiedClick.bind(
                          null,
                          task.name,
                          task.status
                        )}
                      >
                        {task.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Bottom Buttons */}
          <div>
            {cleaningChecklistStatus &&
            reportsStatus &&
            certifiedChecklistStatus ? (
              <button
                className="btn btn-success mb-2"
                style={{ width: "20rem" }}
                //   onClick={}
              >
                Submit
              </button>
            ) : (
              <button
                className="btn btn-success mb-2 disabled "
                style={{ width: "20rem" }}
              >
                Submit
              </button>
            )}
          </div>
          <div>
            {saveStatus ? (
              <button
                className="btn btn-primary mb-2"
                style={{ width: "20rem" }}
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <button
                className="btn btn-primary mb-2 disabled"
                style={{ width: "20rem" }}
              >
                Save
              </button>
            )}
          </div>
          <div>
            <button
              className="btn btn-danger mb-5"
              style={{ width: "20rem" }}
              onClick={confirmDelete}
            >
              Delete
            </button>
            {/* <div className="alert alert-danger">
              Are you sure you want to delete this service? This action cannot
              be undone.
              <div>
                <a href="#" className="alert-link">
                  Yes, Delete.
                </a>
              </div>
            </div> */}
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

export default FieldCleaningChecklist;
