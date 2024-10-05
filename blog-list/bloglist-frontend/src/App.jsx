import { useEffect ,useState} from "react";
import blogService from "./services/blogs";
import UserList from "./services/usersHook";
import Notification from './components/Notification'
import { useBlogContent, useBlogDispatch } from './Context/blogContext'
import {  useUserListContent, useUserListDispatch } from './Context/userListContext'
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
import BlogView from "./views/BlogView";


const App = () => {
    const blogDispatch = useBlogDispatch();
    const user = useUserContent();
    const userDispatch = useUserDispatch();
    let [userListGet] = UserList.getUserList()
    const blogs = useBlogContent();

    useEffect(() => {
        setUser(userDispatch)
       
    }, [userDispatch]);

    const matchedBlogs = useMatch("/blog/:id");
    
    let blogSelected = null
    if ( matchedBlogs != null) {
        blogSelected = blogs.find((u) => u.id === String(matchedBlogs.params.id))
    } else {
        null
    }
  
  return (
    <div className="container">

        <div>
            {user !== null && (
                <>
                    <div>
                        <Notification />
                    </div>
                    <div className="NavBar" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                        <Menu />
                        <LoggedInUser />
                    </div>
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
                    <SingleUserView />
                </div>
            }></Route>
            <Route path="/blog/:id" element={
                <div>
                    <BlogView />
                </div>
            }></Route>
        </Routes>
    </div>
  );
};

export default App;
//blog={blogSelected} 