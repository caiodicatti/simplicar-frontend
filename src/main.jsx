import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import { BrowserRouter } from 'react-router-dom'; - removido o HashRouter
import { HashRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'

/* mudando para amazon, voltar para BrowserRouter
createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/simplicar-frontend">
    <App />
  </BrowserRouter>
)
  */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AuthProvider>
  </StrictMode>
)