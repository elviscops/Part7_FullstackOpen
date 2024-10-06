import { useEffect,useState, useRef } from "react";
import Togglable from "../components/Togglable";
import blogService from "../services/blogs";
import axios from "axios";
import User from "../services/usersHook";
import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams,
    useNavigate, useMatch
  } from 'react-router-dom'
  import { useBlogContent, useBlogDispatch } from '../Context/blogContext'
  import { Navbar,Table, Nav, Form, FormControl, Button, NavItem, Container } from 'react-bootstrap';


const Blog = ({ blog, likeBlogPost, deleteBlogPost, postComment, username }) => {

    const [blogLikes, setBlogLikes] = useState(blog.likes);
    const navigate = useNavigate()
    const [comment, setComment] = useState([]);

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

    const addComment = (event) => {
        postComment(event,blog,comment)
        setComment("")
    }

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
    <><div className="blogPost m-auto">
          <div>
                <div>
                    <h2>{blog.title} : {blog.author}</h2>
                <Button variant="outline-primary" onClick={likeBlog}>
                        Like
                </Button>
                </div>
              
              <div className="container">
              <Form>
                    <Container>
                        <div>
                            <div>
                                <Form.Label className="urlView">URL: {blog.url}</Form.Label>
                               
                            </div>
                            <div>
                                 <Form.Label>Likes: {blog.likes}</Form.Label>
                            </div>
                            <div>
                                <Form.Label>User: <strong>{blog.user.username}</strong></Form.Label>
                            </div>
                        
                        {blog.user.username === username && (
                            <div>
                                <Form.Label>Delete blog:</Form.Label>
                                <Button  variant="outline-danger" onClick={() => deleteBlog(blog.id)}>Remove</Button>
                            </div>
                            
                        )}
                        </div>
                    </Container>
                    

                  
              </Form>

              </div>
          </div>
        </div>
            <div >
                <h2>Comments:</h2>
                <div style={{ display: 'flex', flexWrap: 'nowrap' , margin: '2px' }}>
                    <Form onSubmit={addComment}>
                        <div>
                            Comment:{" "}
                            <Form.Control
                                type="text"
                                id="blogtitle"
                                placeholder="comment"
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                            />
                            <Button  id="addCommentBtn" type="submit">Add</Button>
                        </div>
                    </Form>
                </div>
                <Table>
                    <tbody>
                        {blog.comments.map((item,i) => (<tr className="comment"><td  key={i}>{item}</td></tr>))}
                    </tbody>
                    
                </Table>
          </div>
          </>
  );
};
                                   
export default Blog;
