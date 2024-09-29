import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Blog from "./components/Blog";
import BlogForms from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

import Notification from './components/Notification'
import { showNotification, useMessageDispatch } from './Context/messageContext'


const App = () => {
    const queryClient = useQueryClient()
    const [user, setUser] = useState(null);
    const notificationDispatch = useMessageDispatch();
    const blogFormRef = useRef();

    const {data}  = useQuery({
        queryKey:['blogs'],
        queryFn: blogService.getAll,
        retry:true
        })       
        
    const blogs = data /// Refresh does not fetch data!!!

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        blogService.setToken(user.token)
    }
  }, []);

  const logoutUser = async (event) => {
    window.localStorage.removeItem("loggedInUser");
    window.localStorage.clear();
  };

  const loginUser = async ({ username, password }) => {
    try {
        const user = await loginService.login({ username, password });
        window.localStorage.setItem("loggedInUser", JSON.stringify(user));
        //showNotification(notificationDispatch,`logged in ${user.username}`,true,3)
        showNotification(notificationDispatch,
                "message",
                true,
                1)
        setUser(user);
        blogService.setToken(user.token);
    } catch (exception) {
        console.log(exception)
        //showNotification([`Wrong username or password`,false])
    }
  };

//   const likeBlogPost = async (likedBlog) => {
//     await blogService.like(likedBlog.id, likedBlog);
//     const blogs = await blogService.getAll().then((blogs) => {
//       const blogList = blogs.sort((a, b) => b.likes - a.likes);
//     });
//   };

//   const deleteBlogPost = async (id) => {
//     await blogService.deleteBlog(id);
//     const blogs = await blogService.getAll().then((blogs) => {
//       const blogList = blogs.sort((a, b) => b.likes - a.likes);
//     });
//   };



  return (
    <div>
      <h1>Blogs List Page</h1>
      {user === null && (
        <div>
          <div>
            <Notification />
          </div>
          <div>
            <LoginForm loginUser={loginUser} />
          </div>
        </div>
      )}

      {user !== null && (
        <div>
          <div>
            <div>
              <Notification />
            </div>
            <div>{user.username} has been logged in: </div>
            <div>
              <form onSubmit={logoutUser}>
                <button type="submit">Log Out</button>
              </form>
            </div>
          </div>
          <br></br>
          <div className="addBlogForm">
            <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
              <BlogForms />
            </Togglable>
            <br></br>
          </div>
          <div>
            {

            blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                //likeBlogPost={likeBlogPost}
                //deleteBlogPost={deleteBlogPost}
                username={user.username}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
