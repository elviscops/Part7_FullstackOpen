import { useState } from "react";
import { handleUsername, handlePassword,useLoginContent, useLoginDispatch } from '../Context/loginContext'
import PropTypes from "prop-types";

const LoginForm = ({ loginUser }) => {

    const login = useLoginContent();
    const loginDispatch = useLoginDispatch();

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <div>
          Username{" "}
          <input
            type="text"
            id="username"
            value={login.username}
            onChange={(event) => {
                handleUsername(loginDispatch,event.target.value)
            }}
          />
        </div>
        <div>
          Password{" "}
          <input
            type="password"
            id="password"
            value={login.password}
            onChange={(event) => {
                handlePassword(loginDispatch,event.target.value)
            }}
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
