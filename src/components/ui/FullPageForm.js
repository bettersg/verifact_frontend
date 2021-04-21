import React from 'react'

import { Form, Container, Alert } from 'react-bootstrap'
import { Layout } from '../../styles'

function FullPageForm ({ error, onSubmit, children }) {
  return (
    <Container>
      <Layout.FormWrap>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={onSubmit}>
          {children}
        </Form>
      </Layout.FormWrap>
    </Container>
  )
}

export default FullPageForm
