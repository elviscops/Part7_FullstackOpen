import { useMessageDispatch } from '../messageContext'

const Notification = () => {

    const {message} = useMessageDispatch()

    if (!message) return null
    const notificationClass = message[1] ? 'notificationPositive' : 'notificationNegative'

    return (
        <div className={notificationClass} >
            <h2>{message[0]}</h2>
        </div>
    )
}

export default Notification