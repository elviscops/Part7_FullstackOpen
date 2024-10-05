import { useParams } from "react-router-dom"
import User from "../services/usersHook";


const SingleUserView = () => {
    const {id} = useParams()
    const user = User.getUser(id)

    if (!user) {
        console.log("no user")
        return null
    }

return (
    <>
        <div>
            <h1>{user.name}</h1>
            <h2>Blogs added:</h2>
            <ul>
                {user?.blogs?.map(blog => (
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