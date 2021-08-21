import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'
import Question from '../views/Question'
import Home from '../views/Home'
import Login from '../views/Login'
import Signup from '../views/Signup'
import AskQuestion from '../views/AskQuestion'
import About from '../views/About'
import NotFound from '../views/404'
import Switch from 'react-bootstrap/esm/Switch'
import ReactGA from 'react-ga'

export default () => {
  const history = useHistory()
  ReactGA.initialize('UA-204918741-1')
  useEffect(() => {
    const host = window.location.hostname
    // To not track activities in GA during development testing
    if (host !== 'localhost') {
      trackPageView() // To track the first pageview upon load
      history.listen(trackPageView) // To track the subsequent pageviews
    }
  }, [history])

  function trackPageView () {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }
  return (
    <Switch>
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
      <Route exact key='about' path='/about' component={About} />,
      <Route key='404' path='*' component={NotFound} />
    </Switch>
  )
}
