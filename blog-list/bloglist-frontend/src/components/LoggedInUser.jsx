import { useNavigate } from 'react-router-dom';
import { handlePassword, handleUsername, useLoginContent, useLoginDispatch } from '../Context/loginContext'
import { setUser, useUserContent, useUserDispatch } from '../Context/userContext'   
import { Navbar, Nav, Form, FormControl, Button, NavItem, Container,Stack, Row} from 'react-bootstrap';
 

const LoggedInUser = () => {
    const navigate = useNavigate()
    const loginDispatch = useLoginDispatch();
    const userDispatch = useUserDispatch();
    const user = useUserContent();
    
    const logoutUser = async (event) => {
        event.preventDefault();
        window.localStorage.removeItem("loggedInUser");
        window.localStorage.clear();
        userDispatch({type: "CLEAR"});
        handleUsername(loginDispatch,"")
        handlePassword(loginDispatch,"")
        navigate('/')
    };

 return (
    <div className='loggedin'>
        <span>{user.username} has been logged in: </span>
        <form onSubmit={logoutUser} style={{ display: 'inline-block' }}>
            <Button type="submit">Log Out</Button>
        </form>
     </div>
 )
   
}

export default LoggedInUser;