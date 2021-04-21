import React from 'react'
import { Form } from 'react-bootstrap'

import { Layout } from '../../styles'

function TextInput ({ id, label, onChange }) {
  return (
    <Form.Group size='lg' controlId={id}>
      {label && <Form.Label>{label}</Form.Label>}

      <Layout.FormControl
        type='text'
        onChange={onChange}
      />
    </Form.Group>
  )
}

export default TextInput
