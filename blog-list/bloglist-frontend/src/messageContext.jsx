import { createContext, useReducer, useContext } from 'react'

const messageReducer = (state,action) => {
    switch (action.type) {
        case "SHOW":
            return action.data
        case "HIDE":
            return null
        default:
            return state
    }
}

const MessageContext = createContext()

export const MessageContextProvider = (props) => {
    const [message,  messageDispatch] = useReducer(messageReducer,'')

    const showNotification = (content) => {
        messageDispatch({
            type: "SHOW",
            data: content,
        })
        setTimeout(()=>{
            messageDispatch({
                type:"HIDE"
            })
        },3000)
    }
    return (
        <MessageContext.Provider value={{message,showNotification}}>
            {props.children}
        </MessageContext.Provider>
    )
}

export const useMessageDispatch = () => {
    return useContext(MessageContext)
}


export const useMoodDispatch = () => {
    return useContext(MessageContext)
}


export default MessageContext