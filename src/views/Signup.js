import React, { useState } from "react";
import { commitMutation } from 'react-relay'
import environment from '../config/relay'
import { Redirect } from "react-router";
import graphql from 'babel-plugin-relay/macro'

import {Form, Button, Container} from "react-bootstrap";

const mutation = graphql`
    mutation SignUpMutation($input: UserCreateInput!){
        userCreate(input: $input){
            user {
                id
            }
        }
    }
`

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false)

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    commitMutation(
        environment,
        {
          mutation,
          variables : {
            input: {
                username: username,
                email: email,
                password: password
            }
        },
          onCompleted: (response, errors) => {
            console.log('Response received from server.')
            setRedirect(true)
          },
          onError: err => console.log(err),
        },
    );
  }

  
  return (
    redirect ? 
    <Redirect to="/" /> 
    :
    <div className="Signup">
        <Container >
            <h1 className="text-center mt-5">Signup</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>                
            <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
         
            <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button block size="md" type="submit" disabled={!validateForm()}>Login</Button>
            <Button block size="md" type="submit" disabled={!validateForm()}>Sign Up</Button>
        </Form>
        </Container>
    </div>
  );
}

