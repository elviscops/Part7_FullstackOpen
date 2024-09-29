import { createContext, useReducer, useContext } from 'react'

const messageReducer = (state,action) => {
    switch (action.type) {
        case "SHOW":
            return action.payload;
        case "HIDE":
            return null;
        default:
            return state;
    }
}

export const showNotification = (dispatch, message, mood, timeout) => {
    dispatch({
        type: "SHOW",
        payload: {message,mood}
    })
    setTimeout(()=>{
        dispatch({
            type:"HIDE"
        })
    }, timeout * 1000)
}

const MessageContext = createContext()

export const MessageContextProvider = (props) => {
    const [message,  messageDispatch] = useReducer(messageReducer,{
                                                    message: null, 
                                                    mood: null,
                                                    timeout:0
                                                })
    return (
        <MessageContext.Provider value={[message,messageDispatch]}>
            {props.children}
        </MessageContext.Provider>
    )
}
export const useMessageContent = () => {
    const content = useContext(MessageContext)
    return content[0]
}

export const useMessageDispatch = () => {
    const content = useContext(MessageContext)
    return content[1]
}

export default MessageContext