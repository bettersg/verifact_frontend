import React from 'react'
import { Form } from 'react-bootstrap'

import { Layout } from '../../styles'
import InputError from './InputError'

function TextInput ({
  id,
  label,
  onChange,
  error
}) {
  return (
    <Form.Group size='lg' controlId={id}>
      {label && <Form.Label>{label}</Form.Label>}

      <Layout.FormControl
        type='text'
        isInvalid={!!error}
        onChange={onChange}
      />

      <Form.Control.Feedback type='invalid'>
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default TextInput
