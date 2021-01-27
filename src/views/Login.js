import React, { useState } from "react";

import graphql from 'babel-plugin-relay/macro'
import { commitMutation } from 'react-relay'
import environment from '../config/relay'

import {Form, Button, Container} from "react-bootstrap";


const mutation = graphql`
    mutation LoginMutation($input: ObtainJSONWebTokenInput!) {
        tokenAuth(input: $input) {
            token
            payload
            refreshExpiresIn
        }
    }
`

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false)


    function validateForm() {
        return password.length > 0;
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
                    password: password
                }
            },
            onCompleted: (response, errors) => {
                console.log('Response received from server.')
            },
            onError: err => console.log(err),
            },
        );
    }

    return (
        <div className="Signup">
            <Container >
                <h1 className="text-center mt-5">Login</h1>
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

