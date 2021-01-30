import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import mutate from '../utils/mutate'

import graphql from 'babel-plugin-relay/macro'

import {Form, Button, Container} from 'react-bootstrap'

const mutation = graphql`
    mutation RegisterMutation($input: UserCreateInput!){
        userCreate(input: $input){
            user {
                id
            }
        }
    }
`

function Register({history, props}){
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function validateForm() {
        return email.length > 0 && password.length > 0
    }

    function handleSubmit(e) {
        e.preventDefault()

        const variables = {
            input:{
                username: username,
                email: email,
                password: password
            }
        }

        mutate(mutation,variables)
            // .then(res => console.log(res))
            .then( () => {history.push('/login')})
            .catch(e => console.log(e[0].message))
    }

  
    return (
        <div>
            <Container >
                <h1 className='text-center mt-5'>Register</h1>
                <Form onSubmit={handleSubmit}>
                <Form.Group size='lg' controlId='email'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>    

                <Form.Group size='lg' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
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