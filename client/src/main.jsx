
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
const PUBLISH_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISH_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISH_KEY} >
  <BrowserRouter>
    <App />
  </BrowserRouter>,  
  </ClerkProvider>,
  
)
