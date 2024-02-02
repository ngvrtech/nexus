import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row">
        <div className="col-12 text-center">
          <div>
            <img className="mb-4" src="/ngvr-logo.png" />
          </div>
          <form>
            <div>
              <div className="form-floating mb-3">
                <input
                  placeholder="Username"
                  name="username"
                  id="username"
                  type="text"
                  maxLength="50"
                  required
                  className="form-control"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <label htmlFor="username">Username</label>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Password"
                name="password"
                id="password"
                type="password"
                maxLength="50"
                required
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
