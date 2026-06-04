import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './style/resourceLinks.css'
import './style/desktop.css'
import './style/landingpage.css'
import App from './App.tsx'
import loadModel from "./api/modelLoader.ts";
loadModel();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <App />
  </StrictMode>,
)
