import UserList from "../services/usersHook";
import { Table, Form, Button } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams,
    useNavigate, useMatch
  } from 'react-router-dom'

const UsersView = () => {
    const [userList] = UserList.getUserList()

return (
    <>
        <div>
            <h1>Users</h1>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Blogs Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userList.map((user) => (
                                <tr  key={user.id}>
                                    <td key={user.name}><Link style={{color: 'Black', 'textDecoration': 'none'}} to={`/users/${user.id}`}>{user.name}</Link></td>
                                    <td key={user.blogs}>{user.blogs.length}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    </>
)

    
}

export default UsersView;