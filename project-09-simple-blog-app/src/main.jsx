import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './context/userContext'
import UserPostsContextProvider from './context/userPostsContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <UserPostsContextProvider>
        <Toaster/>
        <App />
      </UserPostsContextProvider>
    </UserContextProvider>
  </StrictMode>,
)
