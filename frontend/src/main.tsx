import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router} from 'react-router-dom'
import UserContextProvider from './context/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <Router>
        <App />
      </Router>
    </UserContextProvider>
  </React.StrictMode>,
)
