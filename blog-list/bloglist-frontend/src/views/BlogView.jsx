import Blog from "../components/Blog";
import { useEffect, useRef } from "react";
import BlogForms from "../components/BlogForm";
import Togglable from "../components/Togglable";
import blogService from "../services/blogs";
import { showNotification, useMessageDispatch } from '../Context/messageContext'
import { useBlogContent, useBlogDispatch } from '../Context/blogContext'
import { setUser, useUserContent, useUserDispatch } from '../Context/userContext'


const BlogView = ({blog}) => {
    const notificationDispatch = useMessageDispatch();
    const blogs = useBlogContent();
    const blogDispatch = useBlogDispatch();
    const user = useUserContent();
    const blogFormRef = useRef();

    if (!blog) {
        return null
    }

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
            <Blog
                key={blog.id}
                blog={blog}
                likeBlogPost={likeBlogPost}
                deleteBlogPost={deleteBlogPost}
                username={user.username} />
        </div>
    </>
)

}

export default BlogView;