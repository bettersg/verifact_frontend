import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import graphql from 'babel-plugin-relay/macro'

import useForm from '../hooks/useForm'
import { Text, Button } from '../styles'
import FullPageForm from '../components/ui/FullPageForm'
import TextInput from '../components/ui/TextInput'

const mutation = graphql`
  mutation SignupMutation($input: UserCreateInput!){
    userCreate(input: $input) {
      user {
        id
      }
    }
  }
`

const Signup = ({ history }) => {
  const {
    errors,
    handleChange,
    handleSubmit,
    isLoading
  } = useForm({
    mutation,
    defaultInput: {
      username: '',
      email: '',
      password: ''
    },
    required: ['username', 'email', 'password'],
    afterSubmit: res => {
      history.push('/login')
    }
  })

  return (
    <FullPageForm
      error={errors.form}
      onSubmit={handleSubmit}
    >
      <Text.H1>Sign Up</Text.H1>

      <TextInput
        id='username'
        label='Username'
        placeholder='jane_doe'
        onChange={handleChange}
        error={errors.username}
      />

      <TextInput
        id='email'
        label='Email'
        placeholder='jane@verifact.sg'
        onChange={handleChange}
        error={errors.email}
      />

      <TextInput
        id='password'
        label='Password'
        placeholder='********'
        onChange={handleChange}
        error={errors.password}
      />

      <Button.FormButtonSet>
        <Button.FormButton
          block size='md'
          background='grey'
        ><Link to='/login'> Log In </Link>
        </Button.FormButton>

        <Button.FormButton
          block size='md'
          background='Primary'
          disabled={isLoading}
        >
          Sign Up
        </Button.FormButton>
      </Button.FormButtonSet>
    </FullPageForm>
  )
}

export default withRouter(Signup)
