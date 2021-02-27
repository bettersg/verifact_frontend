import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import mutate from '../utils/mutate'
import graphql from 'babel-plugin-relay/macro'

import { Form, Container } from 'react-bootstrap'

const mutation = graphql`
  mutation LoginMutation($input: ObtainJSONWebTokenInput!){
    tokenAuth(input: $input) {
      clientMutationId
    }
  } 
`

const Login = ({ history, props }) => {
  const [data, setData] = useState([])
  const { username, email, password } = data
  const [error, setError] = useState('none')

  const validateForm = () => {
    return data.username && data.password
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
      .then(() => { history.push('/') })
      .catch((e) => {
        const message = e[0].message
        setError(message)
      })
  }

  return (
    <>
      <Container>
        <ErrorMessage error={error}>{error}</ErrorMessage>
        <LoginWrapper>
          <Title>Login</Title>
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

            <Form.Group size='lg' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={data.password}
                onChange={e => setData({...data, password: e.target.value})}
                className='form'
              />
            </Form.Group>

            {validateForm()
              ? <ButtonLogin block size='md' type='submit'>Login </ButtonLogin>
              : <ButtonLoginDisabled block size='md' type='submit' disabled>Login </ButtonLoginDisabled>}
            <ButtonRegister
              block size='md'
              onClick={(e) => {
                e.preventDefault()
                history.push('/')
              }}
            >Register
            </ButtonRegister>
          </Form>
        </LoginWrapper>
      </Container>
    </>
  )
}

export default withRouter(Login)

const LoginWrapper = styled.div`
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

const ButtonLogin = styled.button`
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

const ButtonLoginDisabled = styled.button`
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

const ButtonRegister = styled.button`
  border: none;
  font-weight: 600;
  margin-top: 15px;
  border-radius: 10px;
  color: #30323D;
  height: 40px;
  float: right;
`

const Title = styled.h1`
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 3rem !important;
  text-align: center;
`

const ErrorMessage = styled.h1`
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 3rem !important;
  margin-top: 3rem !important;
  text-align: center;
  opacity: ${(props) => props.error === 'none' ? '0' : '1'}
`
