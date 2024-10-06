import { useEffect, useRef } from "react";
import Blog from "../components/Blog";
import BlogForms from "../components/BlogForm";
import Togglable from "../components/Togglable";
import blogService from "../services/blogs";
import { showNotification, useMessageDispatch } from '../Context/messageContext'
import { useBlogContent, useBlogDispatch } from '../Context/blogContext'
import { setUser, useUserContent, useUserDispatch } from '../Context/userContext'
import BlogView from '../views/BlogView'
import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams,
    useNavigate, useMatch
  } from 'react-router-dom'
  import { Navbar, Nav, Form, FormControl, Button, NavItem, Container,Stack, Row} from 'react-bootstrap';
 


const BlogsView = () => {
    const notificationDispatch = useMessageDispatch();
    const blogs = useBlogContent();
    const blogDispatch = useBlogDispatch();
    const user = useUserContent();
    const blogFormRef = useRef();

    useEffect(() => {
        blogService.getAll()
                    .then((blogs) => blogDispatch({type: "GETBLOGS", payload: blogs}));
    }, [blogDispatch]);

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

 return (
        <>
            <div>
                <div>
                    {user !== null && (
                        <div>
                            <div>
                                <h1>Blogs List Page</h1>
                            </div>
                            <br></br>
                            <div className="container">
                                <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
                                    <BlogForms createNewBlog={createNewBlog} />
                                </Togglable>
                                <br></br>
                            </div>
                            <div className="container">
                            
                                    {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
                                        <div className="blogPost" key={blog.id} >
                                            <Stack gap={10}>
                                                <Link style={{color: 'Black', 'textDecoration': 'none'}} to={`/blog/${blog.id}`}>{blog.title} : {blog.author}</Link>
                                            </Stack>
                                        </div>
                                    ))}
                                
                               

                                
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default BlogsView;
