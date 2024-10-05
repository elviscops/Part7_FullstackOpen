import { useState, useRef } from "react";
import Togglable from "../components/Togglable";
import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams,
    useNavigate, useMatch
  } from 'react-router-dom'
  import { useBlogContent, useBlogDispatch } from '../Context/blogContext'


const Blog = ({ blog, likeBlogPost, deleteBlogPost, username }) => {
  const [blogLikes, setBlogLikes] = useState(blog.likes);
  const navigate = useNavigate()
  const blogs = useBlogContent();
  const blogDispatch = useBlogDispatch();

  const [comment, setComment] = useState([]);
    

    const handleAddComment = async (event) => {
        event.preventDefault();
        console.log(comment)
        blogDispatch({type: "COMMENT", payload: comment})
        setComment("");

    };

  if (!blog) {
    return null
}

  const tmpBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    user: blog.user.id,
    comments: blog.comments,
    id: blog.id,
    likes: blogLikes + 1,
  };

  const likeBlog = () => {
    setBlogLikes(blogLikes + 1);
    likeBlogPost(tmpBlog.id,tmpBlog);
  };

  const deleteBlog = (id) => {
    if (window.confirm(`Delete blog ${blog.title} by "${blog.author}`)) {
      deleteBlogPost(id);
      navigate('/')
    }
  };

  return (
    <><div className="blogPost">
          <div>
              <h2>{blog.title} : {blog.author}</h2>
              <div className="togglableContent">
                  <div className="urlView">URL: {blog.url}</div>
                  <div className="likesView">
                      Likes: {blog.likes}
                      <button id="bloglikeBtn" onClick={likeBlog}>
                          Likes
                      </button>
                  </div>
                  <div>User: {blog.user.username}</div>
                  {blog.user.username === username && (
                      <button id="removeBlogBtn" onClick={() => deleteBlog(blog.id)}>
                          remove
                      </button>
                  )}
              </div>
          </div>
        </div>
            <div >
              <h2>Comments:</h2>
              <div style={{ display: 'flex', flexWrap: 'nowrap' , margin: '2px' }}>
                 <form onSubmit={handleAddComment}>
                    <div>
                    Comment:{" "}
                    <input
                        type="text"
                        id="blogtitle"
                        placeholder="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                    <button  id="addCommentBtn" type="submit">
                        Add
                    </button>
                    </div>

                    </form>
              </div>
                <ul>
                  
                    { 
                        blog.comments.map((item,i) => (
                            <li key={i}>{item}</li>))
                        
                        }
                    {blog.comments}
                </ul>
          </div>
          </>
  );
};
                                   
export default Blog;
