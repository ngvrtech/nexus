import { useState, useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container">
      <div className="offset-2 col-9">
        <div className="row mb-3">
          <div>
            <img src="/ngvr-logo.png" />
          </div>
          Login form here
          <form>
            <div>
              <label htmlFor="username">
                Username
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  value={username}
                  placeholder="Username"
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Password
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  value={password}
                  placeholder="Password"
                />
              </label>
            </div>
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
