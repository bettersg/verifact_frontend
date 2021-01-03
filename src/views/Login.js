import React, { useState } from "react";

import styled from 'styled-components'
import graphql from 'babel-plugin-relay/macro'

import {Form, Button, Container} from "react-bootstrap";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
        <Container >
            <h1 className="text-center mt-5">Login</h1>
            <Form onSubmit={handleSubmit}>
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

