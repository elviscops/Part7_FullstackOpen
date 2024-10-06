import { useParams } from "react-router-dom"
import User from "../services/usersHook";
import { Navbar, Nav, Form, Table, FormControl, Button, NavItem, Container,Stack, Row} from 'react-bootstrap';
 

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
            <Table>
            <tbody>
                 {user?.blogs?.map(blog => (
                    <tr key={blog.id}>
                        <td key={blog.title}>{blog.title}</td>
                    </tr>
                ))} 
            </tbody>
               
            </Table>
        </div>
    </>
)

    
}

export default SingleUserView;