import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// local
import './index.css'
import router from './router/mainRouter.jsx'
import store from './redux/store.js'
import AuthProvider from './fierbase-services/authProvider.jsx'
import ThemeProvider from './themeProvider.jsx'

// react redux
import { Provider } from 'react-redux'

// react router
import { RouterProvider } from 'react-router'

// toaster
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <Toaster />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
)