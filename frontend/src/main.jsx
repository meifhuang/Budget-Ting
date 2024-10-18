import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode> 
  <BrowserRouter>
  <Auth0ProviderWithNavigate>
      <App/>
  </Auth0ProviderWithNavigate>
</BrowserRouter>
</StrictMode>
)
