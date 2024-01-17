import React from "react";
import "./Login.css";
const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <div className="App">
      <div className="left"></div>
      <div className="right">
        <h2>Login</h2>

        <div className="form">
          <form>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button>Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
