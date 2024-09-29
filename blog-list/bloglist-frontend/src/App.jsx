import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForms from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from './components/Notification'
import { showNotification, useMessageDispatch } from './Context/messageContext'
import { useBlogContent, useBlogDispatch } from './Context/blogContext'


const App = () => {
    const [user, setUser] = useState(null);
    const notificationDispatch = useMessageDispatch();
    const blogs = useBlogContent();
    const blogDispatch = useBlogDispatch();
    const blogFormRef = useRef();

    useEffect(() => {
        blogService.getAll()
                    .then((blogs) => blogDispatch({type: "GETBLOGS", payload: blogs}));
    }, [blogDispatch]);

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
        showNotification(notificationDispatch,
               `logged in ${user.username}`,
                true,
                3)
        setUser(user);
        blogService.setToken(user.token);
    } catch (exception) {
        console.log(exception)
        showNotification(notificationDispatch,
            `Wrong username or password`,
             false,
             3)
    }
  };

  const createNewBlog = async (newBlog) => {
    try {
        const response = await blogService.create(newBlog)
        blogDispatch({type: "CREATE", payload: response})
        showNotification(notificationDispatch,
            `New Blog: ${newBlog.title} by ${newBlog.author} added`,
            false,
            3)
    } catch (exception) {
        console.log(exception)
        showNotification(notificationDispatch,
            `tried creating, but content too short-'${error}'`,
            false,
            3)
    }
  };

  const likeBlogPost = async (id,likedBlog) => {
    try {
        await blogService.like(id,likedBlog);
        blogDispatch({type: "LIKE", payload: likedBlog})
    } catch (exception) {
        console.log(exception)
    }
    blogService.getAll().then((blogs) => blogDispatch({type: "GETBLOGS", payload: blogs}));
  };

  const deleteBlogPost = async (id) => {
    try {
        await blogService.deleteBlog(id)
        blogDispatch({type: "DELETE", payload: id})
    } catch (exception) {
        console.log(exception)
    }
  };



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
              <BlogForms createNewBlog={createNewBlog}/>
            </Togglable>
            <br></br>
          </div>
          <div>
            {
            blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                likeBlogPost={likeBlogPost}
                deleteBlogPost={deleteBlogPost}
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
