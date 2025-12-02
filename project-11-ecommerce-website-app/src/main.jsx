// react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// local
import './index.css'
import router from './router/mainRouter'

// react router
import { RouterProvider } from 'react-router'

// toaster
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster/>
    <RouterProvider router={router}/>
  </StrictMode>,
)
