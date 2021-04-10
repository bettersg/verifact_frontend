import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'

import mutate from '../utils/mutate'
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

const Signup = ({ history, props }) => {
  const [data, setData] = useState([])
  const { username, password } = data
  const [error, setError] = useState('none')

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
      .then(e => {
        const { token } = e.tokenAuth
        localStorage.setItem('token', token)
      })
      .catch((e) => {
        const message = e[0].message
        setError(message)
      })
  }

  return (
    <>
      <Container>
        <ErrorMessage error={error}>{error}</ErrorMessage>
        <Layout.FormWrap>
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
        </Layout.FormWrap>
      </Container>
    </>
  )
}

export default withRouter(Signup)

const H1WithMarginBottom = styled(Text.H1)`
  margin-bottom: 25px;
`
export const ErrorMessage = styled(Text.Small)`
  font-weight: bold;
  margin-bottom: 3rem;
  margin-top: 3rem;
  text-align: center;
  color: var(--TextError);
  white-space: nowrap;
  overflow: hidden;
  width: 60%;
  margin: 0 auto;
  text-overflow: ellipsis;
  opacity: ${(props) => props.error === 'none' ? '0' : '1'}
`
