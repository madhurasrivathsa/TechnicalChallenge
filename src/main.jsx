import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import MainContext from './components/Context/MainContext.jsx'
//import { CartProvider } from './Context/AddToCartContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </MainContext>
  </StrictMode>,
)
