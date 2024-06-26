import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const FieldInventory = () => {
  // Authenticated user information - ATTENTION needed
  const [user, setUser] = useState({
    name: "Housekeeper1",
    avatar: "https://i.pravatar.cc/300",
  });

  // Stores state of selected property - Dummy data
  const [property, setProperty] = useState({
    address: "123 Main Street",
    image: "https://placehold.co/600x400",
  });

  // Stores list of inventory items - Dummy data
  const [inventory, setInventory] = useState([
    { name: "Ant Poison", status: "Check", notes: "aaa" },
    { name: "Bar Soap", status: "Check", notes: "" },
    { name: "Coffee Filters", status: "Check", notes: "" },
    { name: "Coffee K-Cups", status: "Check", notes: "" },
    { name: "Dish Soap", status: "Check", notes: "s" },
    { name: "Dryer Balls", status: "Check", notes: "" },
    { name: "Lightbulbs", status: "Check", notes: "" },
  ]);

  // Stores visible status and notes in modal
  const [showModal, setShowModal] = useState(false);
  const [notesValue, setNotesValue] = useState({});

  // Stores status of save button in notes modal
  const [saveNoteStatus, setSaveNotesStatus] = useState(false);

  // Stores status to enable/disable submit and save buttons
  const [submitStatus, setSubmitStatus] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);

  // State holds URLs for uploaded photos
  // const [photos, setPhotos] = useState([]);

  // Stores text in comments section
  const [comments, setComments] = useState("");

  const { propertyID, recordID } = useParams();
  const navigate = useNavigate();

  // Supporting functions to change task color/status
  const getAlertClass = (status) => {
    const classMap = {
      Check: "alert-secondary",
      Present: "alert-success",
      Need: "alert-danger",
      Delivered: "alert-primary",
    };
    return classMap[status] || "alert-secondary";
  };
  const getNextStatus = (currentStatus) => {
    const statusMap = {
      Check: "Present",
      Present: "Need",
      Need: "Delivered",
      Delivered: "Check",
    };
    return statusMap[currentStatus] || "Check";
  };

  // Logic to "check off" or change status of an inventory item
  const handleClick = (name, status) => {
    const updatedInventory = inventory.map((item) =>
      item.name === name ? { ...item, status: getNextStatus(status) } : item
    );
    setInventory(updatedInventory);

    // Logic for submit and save buttons
    const filtered = updatedInventory.filter((item) => {
      return item.status === "Check";
    });
    setSubmitStatus(filtered.length < 1);
    setSaveStatus(true);
  };

  // Logic for Notes modal to show/hide and save/clear
  const handleShow = (name, notes) => {
    setNotesValue({ name: name, notes: notes });
    setShowModal(true);
    setSaveNotesStatus(false);
  };
  const handleNotesValue = (e) => {
    setNotesValue({ ...notesValue, notes: e.target.value });
    setSaveNotesStatus(true);
  };
  const handleClear = () => {
    setNotesValue({ ...notesValue, notes: "" });
    setSaveNotesStatus(true);
  };
  const handleSave = () => setSaveStatus(false);
  const handleClose = () => setShowModal(false);

  // Function to handle photos upload feature - ATTENTION NEEDED
  const handlePhotos = () => {
    setSaveStatus(true);
  };

  // Stores comment input
  const handleComments = (e) => {
    setComments(e.target.value);
    setSaveStatus(true);
  };

  const handleSubmit = async () => {
    const checklists = { checklistData: [inventory] };
    const employeeComments = { employeeComments: comments };
    const status = { status: "Completed" };
    const submissionTime = { submissionTime: Date(Date.now().toString()) };
    const submittedData = {
      ...checklists,
      ...employeeComments,
      ...status,
      ...submissionTime,
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
    // TODO: Update the property inventoryNeeded
  };

  // Logic for Save button
  const handleSaveChanges = (name, notes) => {
    const updatedInventory = inventory.map((item) =>
      item.name === name ? { ...item, notes: notes } : item
    );
    setInventory(updatedInventory);
    setSaveStatus(true);
    handleClose();
  };

  // Logic for Cancel button - ATTENTION NEEDED
  const confirmCancel = () =>
    window.confirm("Are you sure you want to cancel this service?");

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
                Inventory
              </h1>
            </div>
          </div>
          <div className="mb-4">
            <span className="alert alert-secondary m-1 p-2 border-0">
              Check
            </span>
            <span className="alert alert-success m-1 p-2 border-0">
              Present
            </span>
            <span className="alert alert-danger m-1 p-2 border-0">Need</span>
            <span className="alert alert-primary m-1 p-2 border-0">
              Delivered
            </span>
          </div>
          <div className="d-flex justify-content-center">
            <div className="col-11">
              {/* Displays all inventory items with status click functionality and notes */}
              {inventory.map((item) => {
                return (
                  <div
                    className={`alert ${getAlertClass(item.status)} m-3 p-2`}
                    key={item.name}
                    style={{ width: "20rem" }}
                  >
                    <div className="row">
                      <div
                        className="col d-flex justify-content-start mx-4"
                        role="button"
                        onClick={handleClick.bind(null, item.name, item.status)}
                      >
                        {item.name}
                      </div>
                      <div
                        className="col-1 d-flex justify-content-end mx-2"
                        role="button"
                        onClick={handleShow.bind(null, item.name, item.notes)}
                      >
                        {item.notes ? (
                          <i
                            className="bi bi-sticky-fill"
                            style={{ color: "#616360" }}
                          />
                        ) : (
                          <i
                            className="bi bi-sticky"
                            style={{ color: "#616360" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <form>
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
            {/* Submit button with enabled logic */}
            {submitStatus ? (
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
            {/* Cancel button - ATTENTION NEEDED */}
            <button
              className="btn btn-danger mb-5"
              style={{ width: "20rem" }}
              onClick={confirmCancel}
            >
              Cancel
            </button>
          </div>
          <div className="mt-5 mb-4">
            <img className="rounded-circle" height="35px" src={user.avatar} />
            <span className="m-3">{user.name}</span>
            <button className="btn btn-outline-secondary btn-sm">Logout</button>
          </div>

          {/* Modal Box */}
          <div>
            <div
              className={`modal ${showModal ? "show" : ""}`}
              tabIndex="-1"
              role="dialog"
              style={{ display: showModal ? "block" : "none" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label className="m-2">
                          Add/Edit Notes for {notesValue.name}
                        </label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={notesValue.notes}
                          onChange={handleNotesValue}
                        ></textarea>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    {/* Close button */}
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                    {/* Clear button */}
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                    {/* Save button */}
                    <button
                      type="button"
                      className={
                        saveNoteStatus
                          ? `btn btn-primary btn-sm`
                          : `btn btn-primary btn-sm disabled`
                      }
                      onClick={handleSaveChanges.bind(
                        null,
                        notesValue.name,
                        notesValue.notes
                      )}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {showModal && (
              <div className="modal-backdrop show" onClick={handleClose}></div>
            )}
          </div>
          {/* End Modal */}
        </div>
      </div>
    </div>
  );
};

export default FieldInventory;
