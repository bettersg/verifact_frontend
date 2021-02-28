import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
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
              type='register'
              disabled={!validateForm()}
            >Register
            </Button>

            <Button
              block size='md'
              type='login'
            ><Link to='/login'> Login </Link>
            </Button>

          </Form>
        </Wrapper>
      </Container>
    </>
  )
}

export default withRouter(Register)

const Wrapper = styled.div`
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
const Button = styled.button`
  background: ${props => props.disabled ? '#414141' : '#FFB800'};
  background: ${props => props.type === 'login' ? 'none' : ''};
  border: none;
  border-radius: 10px;
  margin-left: 8px;
  margin-top: 15px;
  font-weight: 600;
  padding-left: 5px;
  padding-right: 5px;
  color: ${props => props.type === 'login' ? '#30323D' : ''};
  height: 40px;
  width: 100px;
  float: right;

  :focus, :hover, :visited, :active{
    border: none;
    outline: none;
  }
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
  color: #E55934;
  opacity: ${(props) => props.error === 'none' ? '0' : '1'}
`
