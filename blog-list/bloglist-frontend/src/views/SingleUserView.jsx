import { useNavigate } from 'react-router'
import { useEffect ,useState} from "react";


const SingleUserView = ({user}) => {

    if (!user) {
        return null
    }

return (
    <>
        <div>
            <h1>{user.name}</h1>
            <h2>Blogs added:</h2>
            <ul>
                {user.blogs.map(blog => (
                <li key={blog.id}>
                    {blog.title}
                </li>
                ))} 
            </ul>
        </div>
    </>
)

    
}

export default SingleUserView;