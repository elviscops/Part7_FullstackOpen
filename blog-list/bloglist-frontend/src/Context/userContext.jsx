import { createContext, useReducer, useContext } from 'react'
import blogService from "../services/blogs";

const userReducer = (state,action) => {
    switch (action.type) {
        case "SET":
            return action.payload;
        case "CLEAR":
            return null;
        default:
            return state;
    }
}
const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [user,  userDispatch] = useReducer(userReducer,null)
    return (
        <UserContext.Provider value={[user,userDispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}
export const useUserContent = () => {
    const content = useContext(UserContext)
    return content[0]
}

export const useUserDispatch = () => {
    const content = useContext(UserContext)
    return content[1]
}

export const setUser = (userDispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        userDispatch({type:'SET',payload:user})
        blogService.setToken(user.token)
    }
}

export default UserContext