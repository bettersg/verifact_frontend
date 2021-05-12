import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { AuthProvider } from './context/Auth'
import { NotificationProvider } from './context/Notification'
import routes from './routes'
import Navbars from './components/Navbar'

export default function App () {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Navbars />
          <main>
            <Switch>{routes}</Switch>
          </main>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  )
}
