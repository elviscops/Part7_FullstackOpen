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
    // const userList = useUserListContent();
    // const userListDispatch = useUserListDispatch();
    const blogs = useBlogContent();

   console.log(blogs)


    useEffect(() => {
        setUser(userDispatch)
       
    }, [userDispatch]);



    useEffect(() => {
        blogService.getAll()
                    .then((blogs) => blogDispatch({type: "GETBLOGS", payload: blogs}));
    }, [blogDispatch]);

    const matchedUsers = useMatch("/users/:id");
    let userSelected = null
    if ( matchedUsers != null) {
        userSelected = userListGet.find((u) => u.id === String(matchedUsers.params.id))
    } else {
        null
    }

    const matchedBlogs = useMatch("/blog/:id");
    let blogSelected = null
    if ( matchedBlogs != null) {
        blogSelected = blogs.find((u) => u.id === String(matchedBlogs.params.id))
    } else {
        null
    }

    console.log(matchedBlogs)
  
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
            <Route path="/blog/:id" element={
                <div>
                    <BlogView blog={blogSelected} />
                </div>
            }></Route>
        </Routes>
    </div>
  );
};

export default App;
