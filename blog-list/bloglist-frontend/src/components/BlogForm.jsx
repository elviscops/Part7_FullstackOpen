import { useState } from "react";
import { Table, Form, Button } from 'react-bootstrap'

const BlogForm = ({createNewBlog}) => {
    const [title, setTitle] = useState([]);
    const [author, setAuthor] = useState([]);
    const [blogURL, setBlogURL] = useState([]);

    const handleAddBlog = async (event) => {
      event.preventDefault();
      createNewBlog({
        title: title,
        author: author,
        url: blogURL,
      });
      setTitle("");
      setAuthor("");
      setBlogURL("");
    };
  
  return (
    <div className="container">
      <h2>Add new Blog</h2>
      <Form onSubmit={handleAddBlog}>
        <div className="form-group">
          Title:{" "}
          <Form.Control
            type="text"
            id="blogtitle"
            placeholder="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="form-group">
          Author:{" "}
          <Form.Control
            type="text"
            id="blogauthor"
            placeholder="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div className="form-group">
          Link:{" "}
          <Form.Control
            type="text"
            id="blogurl"
            placeholder="url"
            value={blogURL}
            onChange={(event) => setBlogURL(event.target.value)}
          />
        </div>
        <Button id="addblogBtn" type="submit">
          Add
        </Button>
      </Form>
      <div></div>
    </div>
  );
};

export default BlogForm;
