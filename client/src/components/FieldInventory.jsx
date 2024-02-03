import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const FieldInventory = () => {
  const [user, setUser] = useState({
    name: "Housekeeper1",
    avatar: "https://i.pravatar.cc/300",
  });
  const [property, setProperty] = useState({
    address: "123 Main Street",
    image: "https://placehold.co/600x400",
  });
  const [inventory, setInventory] = useState([
    { name: "Ant Poison", status: "Check", notes: "aaa" },
    { name: "Bar Soap", status: "Check", notes: "" },
    { name: "Coffee Filters", status: "Check", notes: "" },
    { name: "Coffee K-Cups", status: "Check", notes: "" },
    { name: "Dish Soap", status: "Check", notes: "s" },
    { name: "Dryer Balls", status: "Check", notes: "" },
    { name: "Lightbulbs", status: "Check", notes: "" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [notesValue, setNotesValue] = useState({});

  const [submitStatus, setSubmitStatus] = useState(false);
  const [saveNoteStatus, setSaveNotesStatus] = useState(false);
  const [saveStatus, setSaveStatus] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [comments, setComments] = useState("");

  const handleShow = (name, notes) => {
    setNotesValue({ name: name, notes: notes });
    setShowModal(true);
    setSaveNotesStatus(false);
  };
  const handleClose = () => setShowModal(false);

  const handleClear = () => {
    setNotesValue({ ...notesValue, notes: "" });
    setSaveNotesStatus(true);
  };

  const handleSave = () => setSaveStatus(false);

  const handleNotesValue = (e) => {
    setNotesValue({ ...notesValue, notes: e.target.value });
    setSaveNotesStatus(true);
  };

  const handlePhotos = () => {
    setSaveStatus(true);
  };

  const handleComments = (e) => {
    setComments(e.target.value);
    setSaveStatus(true);
  };

  const confirmDelete = () =>
    window.confirm("Are you sure you want to delete this service?");

  const handleSaveChanges = (name, notes) => {
    const updatedInventory = inventory.map((item) =>
      item.name === name ? { ...item, notes: notes } : item
    );
    setInventory(updatedInventory);
    setSaveStatus(true);
    handleClose();
  };

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

  const handleClick = (name, status) => {
    const updatedInventory = inventory.map((item) =>
      item.name === name ? { ...item, status: getNextStatus(status) } : item
    );
    setInventory(updatedInventory);

    const filtered = updatedInventory.filter((item) => {
      return item.status === "Check";
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
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
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
