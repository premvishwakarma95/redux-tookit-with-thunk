import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import appStore from './redux/store.js'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>
</Provider>
)
