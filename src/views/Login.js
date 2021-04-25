import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import graphql from 'babel-plugin-relay/macro'

import useForm from '../hooks/useForm'
import { AuthContext } from '../context/Auth'
import { Text, Button } from '../styles'
import FullPageForm from '../components/ui/FullPageForm'
import TextInput from '../components/ui/TextInput'

const mutation = graphql`
  mutation LoginMutation($input: ObtainJSONWebTokenInput!){
    tokenAuth(input: $input) {
      token
    }
  }
`

const Login = ({ history, props }) => {
  const value = React.useContext(AuthContext)
  const {
    errors,
    handleChange,
    handleSubmit,
    isLoading
  } = useForm({
    mutation,
    defaultInput: {
      username: '',
      password: ''
    },
    required: ['username', 'password'],
    afterSubmit: res => {
      value.logIn(res.tokenAuth.token)
      history.push('/')
    }
  })

  return (
    <FullPageForm
      error={errors.form}
      onSubmit={handleSubmit}
    >
      <Text.H1>Log In</Text.H1>

      <TextInput
        id='username'
        label='Username'
        onChange={handleChange}
        error={errors.username}
      />

      <TextInput
        id='password'
        label='Password'
        onChange={handleChange}
        error={errors.password}
      />

      <Button.FormButtonSet>
        <Button.FormButton
          block size='md'
          background='grey'
        ><Link to='/signup'> Sign Up </Link>
        </Button.FormButton>

        <Button.FormButton
          block size='md'
          background='Primary'
          disabled={isLoading}
        >
          Log In
        </Button.FormButton>
      </Button.FormButtonSet>
    </FullPageForm>
  )
}

export default withRouter(Login)
