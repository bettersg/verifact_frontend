import React from 'react'
import { Form } from 'react-bootstrap'

import { Layout } from '../../styles'

function TextInput ({
  id,
  label,
  onChange,
  error,
  inputProps
}) {
  if (!inputProps) inputProps = {}

  return (
    <Form.Group size='lg'>
      {label && <Form.Label htmlFor={id}>{label}</Form.Label>}

      <Layout.FormControl
        id={id}
        type='text'
        isInvalid={!!error}
        onChange={onChange}
        {...inputProps}
      />

      <Form.Control.Feedback type='invalid'>
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default TextInput
