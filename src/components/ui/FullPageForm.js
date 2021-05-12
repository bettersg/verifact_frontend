import React from 'react'

import { Form, Container } from 'react-bootstrap'
import { Layout } from '../../styles'

function FullPageForm ({ onSubmit, children }) {
  return (
    <Container>
      <Layout.FormWrap>
        <Form onSubmit={onSubmit}>
          {children}
        </Form>
      </Layout.FormWrap>
    </Container>
  )
}

export default FullPageForm
