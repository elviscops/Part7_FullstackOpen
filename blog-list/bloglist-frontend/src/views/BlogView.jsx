import Blog from "../components/Blog";
import { useParams, useMatch } from "react-router-dom"
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

    useEffect(() => {
        blogService.getAll()
                    .then((blogs) => blogDispatch({type: "GETBLOGS", payload: blogs}));
    }, [blogDispatch]);

    const matchedBlogs = useMatch("/blog/:id");

    let blogSelected = null
    if ( matchedBlogs != null) {
        blogSelected = blogs.find((u) => u.id === String(matchedBlogs.params.id))
    } else {
        null
    }
  
    const handleAddComment = async (event,blog,comment) => {
        event.preventDefault()
        const newBlogComment = {...blog, comments: [...blog.comments,comment]}
        delete newBlogComment.user
        await blogService.addComment(blog.id,newBlogComment)
        blogDispatch({type: "COMMENT", payload: newBlogComment})
        blogService.getAll().then((blogs) => blogDispatch({type: "GETBLOGS", payload: blogs}));
        showNotification(notificationDispatch,
            `comment added ${comment}`,
             true,
             3)
    };



    if (!blogSelected) {
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
                key={blogSelected.id}
                blog={blogSelected}
                likeBlogPost={likeBlogPost}
                deleteBlogPost={deleteBlogPost}
                postComment={handleAddComment}
                username={user.username} />
        </div>
    </>
)

}

export default BlogView;