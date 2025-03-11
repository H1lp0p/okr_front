import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Body from './components/body/Body'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Body/>
  </StrictMode>,
)
