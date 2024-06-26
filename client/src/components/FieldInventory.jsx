import { useState } from "react";
import { Link } from "react-router-dom";

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
    { name: "Ant Poison", status: "Check", notes: "" },
    { name: "Bar Soap", status: "Present", notes: "" },
    { name: "Coffee Filters", status: "Need", notes: "" },
    { name: "Coffee K-Cups", status: "Delivered", notes: "" },
    { name: "Dish Soap", status: "Check", notes: "" },
    { name: "Dryer Balls", status: "Need", notes: "" },
    { name: "Lightbulbs", status: "Present", notes: "" },
  ]);

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
                    role="button"
                    onClick={handleClick.bind(null, item.name, item.status)}
                    key={item.id}
                    style={{ width: "20rem" }}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <form>
              <div className="my-3">
                <label htmlFor="formFileMultiple" className="form-label">
                  <b>Upload Picture(s)</b>
                </label>
                <input
                  multiple
                  className="form-control"
                  type="file"
                  id="formFileMultiple"
                  style={{ width: "20rem" }}
                />
              </div>
              <div className="form-floating my-3">
                <textarea
                  placeholder="Comments"
                  name="comments"
                  id="comments"
                  className="form-control align-top"
                  style={{ width: "20rem", height: "9rem" }}
                />
                <label>Comments</label>
              </div>
            </form>
          </div>
          <div>
            <button className="btn btn-success mb-2" style={{ width: "20rem" }}>
              Submit
            </button>
          </div>
          <div>
            <button className="btn btn-primary mb-2" style={{ width: "20rem" }}>
              Save
            </button>
          </div>
          <div>
            <button className="btn btn-danger mb-5" style={{ width: "20rem" }}>
              Delete
            </button>
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

export default FieldInventory;
