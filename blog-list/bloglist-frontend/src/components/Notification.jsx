import { useMessageContent } from '../Context/messageContext'

const Notification = () => {
    const message = useMessageContent()
    if (message === null || message.message === null) return null;
    const notificationClass = message.mood ? 'notificationPositive' : 'notificationNegative'
    return (
        <div className={notificationClass} >
            <h3>{message.message}</h3>
        </div>
    )
}
export default Notification