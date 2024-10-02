import { useEffect } from "react";
import blogService from "./services/blogs";
import Notification from './components/Notification'
import { useBlogDispatch } from './Context/blogContext'
import { setUser, useUserContent, useUserDispatch } from './Context/userContext'
import LoggedInUser from "./components/LoggedInUser";

import BlogsView from './views/BlogsView'
import LoginView from './views/LoginView'

import UsersView from './views/UsersView'
import Menu from "./components/Menu";

import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams,
    useNavigate
  } from 'react-router-dom'

const App = () => {
    const blogDispatch = useBlogDispatch();
    const user = useUserContent();
    const userDispatch = useUserDispatch();

    useEffect(() => {
        setUser(userDispatch)

    }, [userDispatch]);

    useEffect(() => {
        blogService.getAll()
                    .then((blogs) => blogDispatch({type: "GETBLOGS", payload: blogs}));
    }, [blogDispatch]);
  
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
        </Routes>
    </div>
  );
};

export default App;
