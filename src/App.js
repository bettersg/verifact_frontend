import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/Auth'
import { NotificationProvider } from './context/Notification'
import Routes from './routes/Routes'
import Navbar from './components/Navbar'

export default function App () {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Navbar />
          <main>
            <Routes />
          </main>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  )
}
