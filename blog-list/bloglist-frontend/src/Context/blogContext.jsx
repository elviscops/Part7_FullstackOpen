import { act } from 'react';
import { createContext, useReducer, useContext } from 'react'

const blogReducer = (state,action) => {
    switch (action.type) {
        case "GETBLOGS":
            return action.payload;
        case "CREATE":
            return [...state,action.payload];
        case "DELETE":
            return state.filter((i)=> i.id !== action.payload);
        case "LIKE":
            return state;
        default:
            return state;
    }
}
const BlogContext = createContext()

export const BlogContextProvider = (props) => {
    const [blog,  blogDispatch] = useReducer(blogReducer,[])
    return (
        <BlogContext.Provider value={[blog,blogDispatch]}>
            {props.children}
        </BlogContext.Provider>
    )
}
export const useBlogContent = () => {
    const content = useContext(BlogContext)
    return content[0]
}

export const useBlogDispatch = () => {
    const content = useContext(BlogContext)
    return content[1]
}

export default BlogContext