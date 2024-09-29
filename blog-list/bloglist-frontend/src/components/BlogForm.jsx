import { useState } from "react";
import blogService from "../services/blogs";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMessageDispatch } from '../messageContext'

const BlogForm = () => {
    const queryClient = useQueryClient();
    const { showNotification } = useMessageDispatch()

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    newBlogMutation.mutate({ title: title, author:author, url:url, votes: 0 })
    event.target.reset();
  };

  const newBlogMutation = useMutation({
      mutationFn: blogService.create,
      onSuccess: (newBlog) => {
          const blogs = queryClient.getQueryData(['blogs'])
          queryClient.setQueryData('blogs', blogs.concat(newBlog))
          queryClient.invalidateQueries({ queryKey: ["blogs"] });
          showNotification([`New Blog: ${newBlog.title} by ${newBlog.author} added`,true])
      }, 
      onError: (error) => {
          showNotification(`tried creating, but content too short-'${error}'`)
      }, 
  });

  return (
    <div>
      <h2>Add new Blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          Title:{" "}
          <input name='title'/>
        </div>
        <div>
          Author:{" "}
          <input
            name='author'
          />
        </div>
        <div>
          Link:{" "}
          <input name='url'/>
        </div>
        <button id="addblogBtn" type="submit">
          Add
        </button>
      </form>
      <div></div>
    </div>
  );
};

export default BlogForm;
