import { createContext, useReducer, useContext } from 'react'

const loginReducer = (state,action) => {
    switch (action.type) {
        case "SETUSERNAME":
            return { ...state, username: action.payload};
        case "SETPASSWORD":
            return { ...state, password: action.payload};
        default:
            return state;
    }
}

export const handleUsername = (loginDispatch, username) => {
    loginDispatch({type:"SETUSERNAME",payload:username})
}

export const handlePassword = (loginDispatch, password) => {
    loginDispatch({type:"SETPASSWORD",payload:password})
}


const LoginContext = createContext()

export const LoginContextProvider = (props) => {
    const [login,  loginDispatch] = useReducer(loginReducer,{username:"",password:""})
    return (
        <LoginContext.Provider value={[login,loginDispatch]}>
            {props.children}
        </LoginContext.Provider>
    )
}
export const useLoginContent = () => {
    const content = useContext(LoginContext)
    return content[0]
}

export const useLoginDispatch = () => {
    const content = useContext(LoginContext)
    return content[1]
}

export default LoginContext