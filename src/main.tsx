import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './root.tsx'
import App from './App.tsx'
import './globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root>
      <App />
    </Root>
  </React.StrictMode>,
)
