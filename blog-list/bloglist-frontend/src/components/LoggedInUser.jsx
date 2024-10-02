import { useNavigate } from 'react-router-dom';
import { handlePassword, handleUsername, useLoginContent, useLoginDispatch } from '../Context/loginContext'
import { setUser, useUserContent, useUserDispatch } from '../Context/userContext'   

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
    <><div>{user.username} has been logged in: </div><div>
        <form onSubmit={logoutUser}>
            <button type="submit">Log Out</button>
        </form>
     </div></>
 )
   
}

export default LoggedInUser;