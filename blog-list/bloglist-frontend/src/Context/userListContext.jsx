import { createContext, useReducer, useContext } from 'react'
import { useEffect ,useState} from "react";
import axios from "axios";




const userListReducer = (state,action) => {
    switch (action.type) {
        case "GET":
            console.log(action.payload)
            return action.payload;
        case "CLEAR":
            return null;
        default:
            return state;
    }
}
const UserListContext = createContext()

export const UserListContextProvider = (props) => {
    const [userList,  userListDispatch] = useReducer(userListReducer,[])
    return (
        <UserListContext.Provider value={[userList,userListDispatch]}>
            {props.children}
        </UserListContext.Provider>
    )
}
export const useUserListContent = () => {
    const content = useContext(UserListContext)
    return content[0]
}

export const useUserListDispatch = () => {
    const content = useContext(UserListContext)
    return content[1]
}

export default UserListContext