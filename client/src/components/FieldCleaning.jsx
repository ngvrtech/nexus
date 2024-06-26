import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const FieldCleaningChecklist = () => {
  const [user, setUser] = useState({
    name: "Housekeeper1",
    avatar: "https://i.pravatar.cc/300",
  });
  const [property, setProperty] = useState({
    address: "123 Main Street",
    image: "https://placehold.co/600x400",
  });
  const [cleaningChecklist, setCleaningChecklist] = useState([
    { name: "Dishwasher started", room: "First Steps", status: "Incomplete" },
    { name: "Laundry started", room: "First Steps", status: "Incomplete" },
    { name: "Toilet sanitized", room: "Bathrooms", status: "Incomplete" },
    { name: "Shower/Tub cleaned", room: "Bathrooms", status: "Incomplete" },
    { name: "Surfaces wiped", room: "Bathrooms", status: "Incomplete" },
    { name: "Fridge cleaned", room: "Kitchen", status: "Incomplete" },
    { name: "Dishes checked", room: "Kitchen", status: "Incomplete" },
    { name: "Supplies available", room: "Kitchen", status: "Incomplete" },
  ]);

  const [submitStatus, setSubmitStatus] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [comments, setComments] = useState("");
  const [missingItems, setMissingItems] = useState({
    missing: false,
    notes: "",
  });
  const [damaged, setDamaged] = useState({
    damaged: false,
    notes: "",
  });

  const handleSave = () => setSaveStatus(false);

  const handlePhotos = () => {
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
      Incomplete: "alert-secondary",
      Completed: "alert-success",
    };
    return classMap[status] || "alert-secondary";
  };

  const getNextStatus = (currentStatus) => {
    const statusMap = {
      Incomplete: "Completed",
      Completed: "Incomplete",
    };
    return statusMap[currentStatus] || "Check";
  };

  const handleClick = (name, status) => {
    const updatedCleaningChecklist = cleaningChecklist.map((task) =>
      task.name === name ? { ...task, status: getNextStatus(status) } : task
    );
    setCleaningChecklist(updatedCleaningChecklist);

    const filtered = updatedCleaningChecklist.filter((task) => {
      return task.status === "Incomplete";
    });
    setSubmitStatus(filtered.length < 1 ? true : false);
    setSaveStatus(true);
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
                className={`alert alert-secondary m-3 p-2`}
                style={{ width: "20rem" }}
              >
                <h5>Are there items missing?</h5>
                <div className="form-check form-check-inline px-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
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
                    value="option2"
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
                className={`alert alert-secondary m-3 p-2`}
                style={{ width: "20rem" }}
              >
                <h5>Is anything damaged?</h5>
                <div className="form-check form-check-inline px-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="damageRadioOptions"
                    id="inlineRadio1"
                    value="no"
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
                    value="yes"
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
          <div>
            {submitStatus ? (
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
