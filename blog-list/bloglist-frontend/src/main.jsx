import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {MessageContextProvider} from './Context/messageContext'
import {BlogContextProvider} from './Context/blogContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <BlogContextProvider>
            <MessageContextProvider>
                <App />
            </MessageContextProvider>
        </BlogContextProvider>
    </QueryClientProvider>
    
);
