import { useEffect ,useState} from "react";
import blogService from "./services/blogs";
import UserList from "./services/usersHook";
import Notification from './components/Notification'
import { useBlogDispatch } from './Context/blogContext'
import { setUser, useUserContent, useUserDispatch } from './Context/userContext'
import LoggedInUser from "./components/LoggedInUser";
import axios from "axios";
import BlogsView from './views/BlogsView'
import LoginView from './views/LoginView'

import UsersView from './views/UsersView'
import Menu from "./components/Menu";

import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams,
    useNavigate, useMatch
  } from 'react-router-dom'
import SingleUserView from "./views/SingleUserView";


const App = () => {
    const blogDispatch = useBlogDispatch();
    const user = useUserContent();
    const userDispatch = useUserDispatch();
    const [userList] = UserList.getUserList()


    useEffect(() => {
        setUser(userDispatch)

    }, [userDispatch]);

    useEffect(() => {
        blogService.getAll()
                    .then((blogs) => blogDispatch({type: "GETBLOGS", payload: blogs}));
    }, [blogDispatch]);

    const matchedUsers = useMatch("/users/:id");
    const userSelected = matchedUsers
    ? userList.find((u) => u.id === String(matchedUsers.params.id))
    : null;
  
  return (
    <div>
        <div>
            <Notification />
        </div>
        <div>
            {user !== null && (
                <>
                    <div>
                        <Menu />
                    </div>
                    <LoggedInUser />
                </>
            )}
        </div>
                
        <Routes>
            <Route path='/' element={
                <>
                <div>
                    <LoginView />             
                </div>
                <div>
                    <BlogsView />
                </div>
                </>}>
            </Route>
            <Route path="/users" element={
                <div>
                    <UsersView />
                </div>
            }></Route>
            <Route path="/users/:id" element={
                <div>
                    <SingleUserView user={userSelected} />
                </div>
            }></Route>
        </Routes>
    </div>
  );
};

export default App;
