import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if (typeof window !== 'undefined') {
  if (window.location.search.includes('role=hr')) {
    localStorage.setItem('token', 'hr-admin-token-exim2d');
    localStorage.setItem('userRole', 'HR');
  } else if (window.location.search.includes('role=employee')) {
    localStorage.setItem('token', 'employee-token-exim2d');
    localStorage.setItem('userRole', 'EMPLOYEE');
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
