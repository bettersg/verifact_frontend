import React, { useState, useContext } from 'react'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'

import mutate from '../utils/mutate'
import { AuthContext } from '../context/Auth'

import graphql from 'babel-plugin-relay/macro'

import { Form, Container } from 'react-bootstrap'
import { Text, Button, Layout } from '../styles'

const mutation = graphql`
  mutation LoginMutation($input: ObtainJSONWebTokenInput!){
    tokenAuth(input: $input) {
      token
    }
  } 
`

const Login = ({ history, props }) => {
  const [data, setData] = useState([])
  const { username, password } = data
  const [error, setError] = useState(null)
  const value = useContext(AuthContext)

  const validateForm = () => {
    return data.password && data.username
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const variables = {
      input: {
        username: username,
        password: password
      }
    }

    mutate(mutation, variables)
      .then(res => {
        value.logIn(res.tokenAuth.token)
        history.push('/')
      })
      .catch((e) => {
        const { message } = e[0]
        setError(message)
      })
  }

  return (
    <>
      <Container>
        <ErrorMessage error={error}>{error}</ErrorMessage>
        <LoginFormWrap>
          <H1WithMarginBottom>Log In</H1WithMarginBottom>
          <Form onSubmit={handleSubmit}>
            <Form.Group size='lg' controlId='email'>
              <Form.Label>Username</Form.Label>
              <Layout.FormControl
                type='text'
                onChange={e => setData({ ...data, username: e.target.value })}
              />
            </Form.Group>

            <Form.Group size='lg' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Layout.FormControl
                type='password'
                onChange={e => setData({ ...data, password: e.target.value })}
              />
            </Form.Group>

            <Button.FormButton
              block size='md'
              background='Primary'
              disabled={!validateForm()}
            >
              Log In
            </Button.FormButton>

            <Button.FormButton
              block size='md'
              background='grey'
            ><Link to='/signup'> Sign Up </Link>
            </Button.FormButton>

          </Form>
        </LoginFormWrap>
      </Container>
    </>
  )
}

export default withRouter(Login)

const H1WithMarginBottom = styled(Text.H1)`
  margin-bottom: 25px;
`

const LoginFormWrap = styled(Layout.FormWrap)`
  height: 400px;
`

const ErrorMessage = styled(Text.Error)`
  opacity: ${(props) => props.error ? '1' : '0'}
`
