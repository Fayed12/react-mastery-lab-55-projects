import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './context/userContext'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <Toaster/>
      <App />
    </UserContextProvider>
  </StrictMode>,
)
