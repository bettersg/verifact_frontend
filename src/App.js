import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { AuthProvider } from './context/Auth'

import routes from './routes'
import Navbars from './components/Navbar'

export default function App () {
  return (
    <AuthProvider>
      <Router>
        <Navbars />
        <main>
          <Switch>{routes}</Switch>
        </main>
      </Router>
    </AuthProvider>
  )
}

// context - global variable
