import axios from "axios";
import { useEffect ,useState} from "react";

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

const getUserList = () =>{
    const userList = useResource('http://localhost:3003/api/users')
    return userList
}


export default {getUserList};