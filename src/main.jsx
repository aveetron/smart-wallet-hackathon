import { GoogleOAuthProvider } from '@react-oauth/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

const IPFS_GATEWAY_URL = import.meta.env.VITE_REACT_APP_GOOGLE_OAUTH_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={IPFS_GATEWAY_URL}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
