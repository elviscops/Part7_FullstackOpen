import { useEffect } from "react";
import Notification from './components/Notification'
import { useBlogContent } from './Context/blogContext'
import { setUser, useUserContent, useUserDispatch } from './Context/userContext'
import LoggedInUser from "./components/LoggedInUser";
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

    const user = useUserContent();
    const userDispatch = useUserDispatch();
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

        <div className="container">
            {user !== null && (
                <>
                    <div>
                        <Notification />
                    </div>
                    <div className="NavBar" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                        <Menu />
                        
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
