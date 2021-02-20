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
  const [data, setData] = useState([])
  const {username, email, password} = data
  
  function validateForm () {
    return data.email && data.password 
  }

  function handleSubmit (e) {
    e.preventDefault()

    const variables = {
      input: {
        username: username,
        email: email,
        password: password,
      }
    }

    mutate(mutation, variables)
      .then(() => { history.push('/login') })
  }

  return (
    <div>
      <Container>
        <div className="register">
          <h1 className='title mb-5'>Register</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group size='lg' controlId='email' > 
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                value={data.username}
                onChange={e => setData({...data, username: e.target.value})}
                className="form"
              />
            </Form.Group>

            <Form.Group size='lg' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                value={data.email}
                onChange={e => setData({...data, email: e.target.value})}
                className="form"
              />
            </Form.Group>

            <Form.Group size='lg' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={data.password}
                onChange={e => setData({...data, password: e.target.value})}
                className="form"
              />
            </Form.Group>

              <button className={`float-right ${validateForm()? `register` : `register-disabled`}`} block size='md' type='submit' disabled={!validateForm()}>Register</button>
           

          </Form>
             <button className="login float-right" block size='md' onClick={console.log('yes')}>Log In</button>
        </div>
      </Container>
    </div>
  )
}

export default withRouter(Register)

