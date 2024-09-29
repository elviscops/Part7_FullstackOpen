import { useMessageContent } from '../Context/messageContext'

const Notification = () => {

    const message = useMessageContent()
    console.log("Notif Message",message)

    if (message === null || message.message === null) return null;

    const notificationClass = message.mood ? 'notificationPositive' : 'notificationNegative'

    return (
        <div className={notificationClass} >
            <h2>{message.message}</h2>
        </div>
    )
}

export default Notification