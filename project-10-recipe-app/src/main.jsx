import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router'
import router from './routers/mainrouter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster/>
    <RouterProvider router={ router}/>
  </StrictMode>,
)
