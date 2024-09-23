import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);

  const handleLogin = async (event) => {
    event.preventDefault();
    loginUser({
      username: username,
      password: password,
    });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username{" "}
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          Password{" "}
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button id="loginButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default LoginForm;
