import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const FieldCleaningChecklist = () => {
  // Authenticated user information - ATTENTION needed
  const [user, setUser] = useState({
    name: "hkim",
    avatar: "https://i.pravatar.cc/300",
  });

  // Stores state of selected property
  const [property, setProperty] = useState({});

  // Stores state of cleaning checklist and status for submit button logic
  const [cleaningChecklist, setCleaningChecklist] = useState([]);
  const [cleaningChecklistStatus, setCleaningChecklistStatus] = useState(false);

  // Stores certified tasks and status for submit button logic
  const [certifiedChecklist, setCertifiedChecklist] = useState([
    { name: "Furniture in their correct location.", status: false },
    { name: "Everything appears presentable.", status: false },
    { name: "The house is ready for guests.", status: false },
  ]);
  const [certifiedChecklistStatus, setCertifiedChecklistStatus] =
    useState(false);

  // Stores reports and status for submit button logic
  const [reports, setReports] = useState({});
  const [reportsStatus, setReportsStatus] = useState(false);

  // Stores status and notes for missing items and damages
  const [missingItems, setMissingItems] = useState({
    status: null,
    notes: "",
  });
  const [damaged, setDamaged] = useState({
    status: null,
    notes: "",
  });

  // Stores text in comments section
  const [comments, setComments] = useState("");

  // Handles requirements met function to display save button
  const [saveStatus, setSaveStatus] = useState(false);

  // State holds URLs for uploaded photos
  // const [photos, setPhotos] = useState([]);

  const { propertyID, recordID } = useParams();
  const navigate = useNavigate();

  // Function to fetch data for selected property
  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/properties/${propertyID}`
      );
      setProperty(response.data.property);
      setCleaningChecklist(response.data.property.cleaningChecklist);
    } catch (err) {
      console.log(err.response || err.request || err.message);
    }
  };

  // Fetches property data on page load
  useEffect(() => {
    fetchProperty();
  }, []);

  // Supporting functions to change task color/status
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

  // Logic to "check off" a cleaning task
  const handleClick = (name, status) => {
    const updatedCleaningChecklist = cleaningChecklist.map((task) =>
      task.name === name ? { ...task, status: getNextStatus(status) } : task
    );
    setCleaningChecklist(updatedCleaningChecklist);

    // Logic for submit and save buttons
    const filtered = updatedCleaningChecklist.filter((task) => {
      return task.status === false;
    });
    setCleaningChecklistStatus(filtered.length < 1 ? true : false);
    setSaveStatus(true);
  };

  // Function to handle photos upload feature - ATTENTION NEEDED
  const handlePhotos = () => {
    setSaveStatus(true);
  };

  // Logic for missing items radio and comments
  const handleMissingItemsRadio = (e) => {
    setMissingItems({ ...missingItems, status: e.target.value });
    setReports({ missingStatus: true });
    setReportsStatus(reports.damageStatus);
    setSaveStatus(true);
  };
  const handleMissingItems = (e) => {
    setMissingItems({ ...missingItems, notes: e.target.value });
    setSaveStatus(true);
  };

  // Logic for damaged radio and comments
  const handleDamagedRadio = (e) => {
    setDamaged({ ...damaged, status: e.target.value });
    setReports({ damagesStatus: true });
    setReportsStatus(reports.missingStatus);
    setSaveStatus(true);
  };
  const handleDamaged = (e) => {
    setDamaged({ ...damaged, notes: e.target.value });
    setSaveStatus(true);
  };

  // Sets comments and changes save status
  const handleComments = (e) => {
    setComments(e.target.value);
    setSaveStatus(true);
  };

  // Logic requiring all certified requirements met
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

  // Logic for Submit button
  const handleSubmit = async () => {
    const checklists = { checklistData: [cleaningChecklist] };
    const reports = {
      reportedIssues: [
        {
          type: "Missing",
          status: missingItems.status,
          notes: missingItems.notes,
        },
        { type: "Damaged", status: damaged.status, notes: damaged.notes },
      ],
    };
    const employeeComments = { employeeComments: comments };
    console.log(reports.reportedIssues[0].status);
    console.log(reports.reportedIssues[1].status);
    console.log(reports.reportedIssues[0].status === "true");

    const submittedStatus =
      reports.reportedIssues[0].status === "true" ||
      reports.reportedIssues[1].status === "true"
        ? { status: "Needs Attention" }
        : { status: "Completed" };
    console.log(submittedStatus);

    const submissionTime = { submissionTime: Date(Date.now().toString()) };
    const submittedData = {
      ...submissionTime,
      ...checklists,
      ...reports,
      ...employeeComments,
      ...submittedStatus,
    };
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/records/${recordID}`,
        submittedData
      );
      console.log(response);
    } catch (err) {
      console.log(err.response || err.request || err.message);
    }
    navigate(`/field/${propertyID}`, { replace: true });
  };

  // Logic for Save button
  const handleSave = async (e) => {
    e.preventDefault();
    const checklists = { checklistData: [cleaningChecklist] };
    const reports = {
      reportedIssues: [
        {
          type: "Missing",
          status: missingItems.status,
          notes: missingItems.notes,
        },
        { type: "Damaged", status: damaged.status, notes: damaged.notes },
      ],
    };
    const employeeComments = { employeeComments: comments };
    const updatedData = { ...checklists, ...reports, ...employeeComments };
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/records/${recordID}`,
        updatedData
      );
      console.log(response.data.record);
    } catch (err) {
      console.log(err.response || err.request || err.message);
    }
    setSaveStatus(false);
  };

  // Logic for Cancel button
  const handleCancel = async () => {
    const shouldCancel = window.confirm(
      "Are you sure you want to cancel this service?"
    );
    if (shouldCancel) {
      try {
        const response = await axios.patch(
          `http://localhost:5000/api/v1/records/${recordID}`,
          { status: "Cancelled" }
        );
        console.log(response.data);
      } catch (err) {
        console.log(err.response || err.request || err.message);
      }

      navigate(`/field/${propertyID}`, { replace: true });
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
              <div className="mt-2">{property.address}</div>
              <h1 className="card-title" style={{ color: "#293A8E" }}>
                Cleaning Checklist
              </h1>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="col-11">
              {/* Displays all cleaning tasks with click functionality */}
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
              {/* Missing items report */}
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
                    onChange={handleMissingItemsRadio}
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
                    onChange={handleMissingItemsRadio}
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
              {/* Damages report */}
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
                  onChange={handleDamaged}
                  value={damaged.notes}
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
          <div>
            {/* Submit button with enabled logic */}
            {cleaningChecklistStatus &&
            reportsStatus &&
            certifiedChecklistStatus ? (
              <button
                className="btn btn-success mb-2"
                style={{ width: "20rem" }}
                onClick={handleSubmit}
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
            {/* Save button with enabled logic */}
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
            {/* Cancel button with confirm popup */}
            <button
              className="btn btn-danger mb-5"
              style={{ width: "20rem" }}
              onClick={handleCancel}
            >
              Cancel
            </button>
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

export default FieldCleaningChecklist;
