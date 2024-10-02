import { useEffect, useRef } from "react";
import LoginForm from "../components/LoginForm";
import Notification from '../components/Notification'
import { setUser,useUserContent,useUserDispatch } from '../Context/userContext'

const LoginView = () => {

    const user = useUserContent();
 
    return (
        <>
            <div>
                <div>
                    {user === null && (
                        <div>
                            <div>
                                <Notification />
                            </div>
                            <div>
                                <LoginForm />
                            </div>
                        </div>
                    )}
                </div>
            </div>  
        </>
    )
}

export default LoginView;