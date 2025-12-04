// react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// rtk
import { Provider } from 'react-redux'
import store from './redux/store'

// local
import './index.css'
import router from './router/mainRouter'

// react router
import { RouterProvider } from 'react-router'

// toaster
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster />
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
