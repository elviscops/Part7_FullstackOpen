import { useEffect, useRef } from "react";
import Blog from "../components/Blog";
import BlogForms from "../components/BlogForm";
import Togglable from "../components/Togglable";
import blogService from "../services/blogs";
import { showNotification, useMessageDispatch } from '../Context/messageContext'
import { useBlogContent, useBlogDispatch } from '../Context/blogContext'
import { setUser, useUserContent, useUserDispatch } from '../Context/userContext'



const BlogsView = () => {
    const notificationDispatch = useMessageDispatch();
    const blogs = useBlogContent();
    const blogDispatch = useBlogDispatch();
    const user = useUserContent();
    const blogFormRef = useRef();

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
        <>
            <div>
                <div>
                    
                    {user !== null && (
                        <div>
                            <div>
                                <h1>Blogs List Page</h1>
                            </div>
                            <br></br>
                            <div className="addBlogForm">
                                <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
                                    <BlogForms createNewBlog={createNewBlog} />
                                </Togglable>
                                <br></br>
                            </div>
                            <div>
                                {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
                                    <Blog
                                        key={blog.id}
                                        blog={blog}
                                        likeBlogPost={likeBlogPost}
                                        deleteBlogPost={deleteBlogPost}
                                        username={user.username} />
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