import React, { useState, useEffect, createContext} from 'react'

import getToken from '../utils/auth'

export const AuthContext = createContext({
  token: null,
  isLoggedIn: null,
  logIn: () => {},
  logOut: () => {}
})

export const AuthProvider = () => {
  const [token, setToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  useEffect(() => {
    async function get() {
      try {
        const token = await getToken()
        setToken(token)
        setIsLoggedIn(true)
      } catch {
        console.log('error')
      }
    }
  }, [])

  const logIn = async (token) => {
    await setToken(token)
    await this.setState({ token, isSignedIn: true })
  }

  const logOut = async () => {
    setToken(null)
    setIsLoggedIn(false)
    return setToken('')
  }

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn: isLoggedIn,
        logIn: logIn,
        logOut: logOut
      }}
    />
  )
}

export const AuthConsumer = AuthContext.Consumer
