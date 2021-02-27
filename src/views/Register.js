import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import mutate from '../utils/mutate'
import graphql from 'babel-plugin-relay/macro'

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

const Register = ({ history, props }) => {
  const [data, setData] = useState([])
  const { username, email, password } = data

  const validateForm = () => {
    return data.email && data.password
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
  }

  return (
    <>
      <Container>
        <RegisterWrapper>
          <h1 className='title mb-5'>Register</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group size='lg' controlId='email'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                value={data.username}
                onChange={e => setData({ ...data, username: e.target.value })}
                className='form'
              />
            </Form.Group>

            <Form.Group size='lg' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                value={data.email}
                onChange={e => setData({ ...data, email: e.target.value })}
                className='form'
              />
            </Form.Group>

            <Form.Group size='lg' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={data.password}
                onChange={e => setData({ ...data, password: e.target.value })}
                className='form'
              />
            </Form.Group>

            {validateForm()
              ? <ButtonRegister block size='md' type='submit'>Register </ButtonRegister>
              : <ButtonRegisterDisabled block size='md' type='submit' disabled>Register </ButtonRegisterDisabled>}
            <ButtonLogin
              block size='md'
              onClick={(e) => {
                e.preventDefault()
                history.push('/login')
              }}
            >Log In
            </ButtonLogin>
          </Form>
        </RegisterWrapper>
      </Container>
    </>
  )
}

export default withRouter(Register)

const RegisterWrapper = styled.div`
  width: 50%;
  margin: 45px auto;
  background: #EEF0F2;
  border-radius: 20px;
  padding: 50px;
  font-weight: 600;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  height: 450px;

  @media only screen and (max-width: 1199px){
    width: 75%;
  }

  @media only screen and (max-width: 767px){
    width: 96%;
  }
`

const ButtonRegister = styled.button`
  background: #FFB800;
  border: none;
  border-radius: 10px;
  margin-left: 8px;
  margin-top: 15px;
  font-weight: 600;
  padding-left: 5px;
  padding-right: 5px;
  color: #30323D;
  height: 40px;
  width: 100px;
  float: right;
`

const ButtonRegisterDisabled = styled.button`
  background: #414141;
  border: none;
  border-radius: 10px;
  margin-left: 8px;
  margin-top: 15px;
  font-weight: 600;
  padding-left: 5px;
  padding-right: 5px;
  color: #ffffff;
  height: 40px;
  width: 100px;
  float: right;
`

const ButtonLogin = styled.button`
  border: none;
  font-weight: 600;
  margin-top: 15px;
  border-radius: 10px;
  color: #30323D;
  height: 40px;
  float: right;
`
