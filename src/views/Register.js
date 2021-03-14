import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'

import mutate from '../utils/mutate'
import graphql from 'babel-plugin-relay/macro'

import { Form, Container } from 'react-bootstrap'
import { Wrapper } from '../styles/Wrapper'
import { Button } from '../styles/Button'
import { Title } from '../styles/Title'
import { ErrorMessage } from '../styles/Error'

const mutation = graphql`
  mutation RegisterMutation($input: UserCreateInput!){
    userCreate(input: $input){
            user {
                id
            }
        }
    }
`

const Register = ({ history, props }) => {
  const [data, setData] = useState([])
  const { username, email, password } = data
  const [error, setError] = useState('none')

  const validateForm = () => {
    return data.email && data.password && data.username
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const variables = {
      input: {
        username: username,
        email: email,
        password: password
      }
    }

    mutate(mutation, variables)
      .then(() => { history.push('/login') })
      .catch((e) => {
        const message = e[0].message.substring(96)
        setError(message)
      })
  }

  return (
    <>
      <Container>
        <ErrorMessage error={error}>{error}</ErrorMessage>
        <Wrapper>
          <Title>Register</Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group size='lg' controlId='email'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                onChange={e => setData({ ...data, username: e.target.value })}
                className='form'
              />
            </Form.Group>

            <Form.Group size='lg' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                onChange={e => setData({ ...data, email: e.target.value })}
                className='form'
              />
            </Form.Group>

            <Form.Group size='lg' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                onChange={e => setData({ ...data, password: e.target.value })}
                className='form'
              />
            </Form.Group>

            <Button
              block size='md'
              type='control'
              disabled={!validateForm()}
            >Register
            </Button>

            <Button
              block size='md'
              type='redirect'
            ><Link to='/login'> Login </Link>
            </Button>

          </Form>
        </Wrapper>
      </Container>
    </>
  )
}

export default withRouter(Register)
