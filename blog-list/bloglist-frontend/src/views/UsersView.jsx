import { useEffect, useState, useRef } from "react";
import axios from "axios";

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    useEffect(() => {
      const getResourceList = async (url) => {
        try{
            const resourceData= await axios.get(url);
            return resourceData.data;
        }catch(error){
            return { found: false };
        }
      }
  
      getResourceList(baseUrl).then((resourceData) => {
          setResources(resourceData);
      });
    },[baseUrl])
  
    return [
      resources
    ]
  }

const UsersView = () => {
    const [userList] = useResource('http://localhost:3003/api/users')

return (
    <>
        <div>
            <h1>Users</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Blogs Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userList.map((user) => (
                                <tr key={user.id}>
                                    <td key={user.name}>{user.name}</td>
                                    <td key={user.blogs}>{user.blogs.length}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
)

    
}

export default UsersView;