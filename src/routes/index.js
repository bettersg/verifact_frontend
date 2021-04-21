import React from 'react'
import { Route } from 'react-router-dom'
import Question from '../views/Question'
import Home from '../views/Home'
import Login from '../views/Login'
import Signup from '../views/Signup'
import AskQuestion from '../views/AskQuestion'
import NotFound from '../views/404'

export default [
  <Route
    exact
    key='question'
    path='/question/:id'
    component={Question}
  />,
  <Route exact key='home' path='/' component={Home} />,
  <Route exact key='login' path='/login' component={Login} />,
  <Route exact key='signup' path='/signup' component={Signup} />,
  <Route exact key='ask-a-question' path='/ask-a-question' component={AskQuestion} />,
  <Route key='404' path='*' component={NotFound} />
]
