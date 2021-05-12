import React, { useState, createContext } from 'react'
import { Alert } from 'react-bootstrap'
import styled from 'styled-components'

export const NotificationContext = createContext({ show: null })

export const NotificationProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [text, setText] = useState('')
  const [type, setType] = useState('primary')

  async function show (newText, newType = 'primary') {
    await setText(newText)
    await setType(newType)
    setIsVisible(true)
  }

  function hide () {
    setIsVisible(false)
  }

  const contextValue = { show }

  return (
    <NotificationContext.Provider value={contextValue}>
      <Wrap>
        <Alert
          show={isVisible}
          variant={type}
          onClose={hide}
          dismissible
        >
          {text}
        </Alert>
      </Wrap>

      {children}
    </NotificationContext.Provider>
  )
}

const Wrap = styled.div`
  position: fixed;
  top: 6rem;
  width: 100%;
  padding: 0 3rem;
`

export const NotificationConsumer = NotificationContext.Consumer
