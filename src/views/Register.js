import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import mutate from '../utils/mutate'
import graphql from 'babel-plugin-relay/macro'

import styled from "styled-components"
import { Form, Container } from 'react-bootstrap'

const mutation = graphql`
    mutation RegisterMutation($input: UserCreateInput!){
    userCreate(input: $input){
            user {
                id
            }
        }
    }
`

function Register ({ history, props }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function validateForm () {
    return email.length > 0 && password.length > 0
  }

  function handleSubmit (e) {
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
      .catch(err => console.log(err[0].message))
  }

  return (
    <div>
      <Container>
        <h1 className='text-center mt-5'>Register</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group size='lg' controlId='email'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group size='lg' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group size='lg' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button block size='md' type='submit' disabled={!validateForm()}>Register</Button>

        </Form>
      </Container>
    </div>
  )
}

export default withRouter(Register)

const Button = styled.button`
  background: #FFB800;
  display: block;
  height: 35px;
  border :none;
  margin: 15px auto;
  width: 150px;
  color: #222; 
  box-shadow: 0 11px 36px 0 rgb(70 89 138 / 25%);
  border-radius: 25px;
`
