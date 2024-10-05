import { handleUsername, handlePassword,useLoginContent, useLoginDispatch } from '../Context/loginContext'
import { showNotification, useMessageDispatch } from '../Context/messageContext'
import { useUserDispatch } from '../Context/userContext'
import loginService from "../services/login";
import blogService from "../services/blogs";
import { Table, Form, Button } from 'react-bootstrap'

const LoginForm = () => {

    const userDispatch = useUserDispatch();
    const notificationDispatch = useMessageDispatch();
    const login = useLoginContent();
    const loginDispatch = useLoginDispatch();
    
    const loginUser = async (event) => {
       
        event.preventDefault();
        try {
            const user = await loginService.login({ ...login });
            window.localStorage.setItem("loggedInUser", JSON.stringify(user));
            userDispatch({type: "SET", payload: user});
            showNotification(notificationDispatch,
                   `logged in ${user.username}`,
                    true,
                    3)
            blogService.setToken(user.token);
            handleUsername(loginDispatch,"")
            handlePassword(loginDispatch,"")
            
        } catch (exception) {
            console.log(exception)
            showNotification(notificationDispatch,
                `Wrong username or password`,
                 false,
                 3)
        }
      };
    
  return (
    <div className='loginScreen'>
      <h2>Login</h2>
      <Form onSubmit={loginUser}>
      <Form.Group>
        <div>
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="text"
                id="username"
                value={login.username}
                onChange={(event) => {
                    handleUsername(loginDispatch,event.target.value)
                }}
            />
            </div>
      </Form.Group>
      <Form.Group>
        <div>
            <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={login.password}
            onChange={(event) => {
                handlePassword(loginDispatch,event.target.value)
            }}
          />
        </div>
      </Form.Group>
      
        <Button variant="primary" id="loginButton" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};


export default LoginForm;
