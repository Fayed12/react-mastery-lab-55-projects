// react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// local
import './index.css'

// toaster
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import store from './Redux/store.js'
import { RouterProvider } from 'react-router'
import router from './router/mainRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
