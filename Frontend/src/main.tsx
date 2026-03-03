import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
import { Provider } from './components/ui/provider.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Provider>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </ReduxProvider>
  </StrictMode>,
)
