import React from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'
import { graphql } from 'babel-plugin-relay/macro'

import useForm from '../hooks/useForm'
import { Text, Button, Input } from '../styles'
import TextInput from './ui/TextInput'

const mutation = graphql`
  mutation SubmitAnswerFormMutation($input: AnswerCreateInput!){
    answerCreate(input: $input){
      answer {
        ...AnswerCard_answer
        question {
          ...QuestionCard_question
        }
      }
    }
  }
`

export default function SubmitAnswerForm ({ close, questionId }) {
  const {
    errors,
    handleChange,
    handleSubmit,
    isLoading
  } = useForm({
    mutation,
    defaultInput: {
      answer: 'True',
      text: '',
      citationUrl: '',
      questionId
    },
    required: ['text', 'citationUrl'],
    afterSubmit: close
  })

  return (
    <Wrap>
      <Text.H1>Answer the Question</Text.H1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Input.Radio
            defaultChecked
            inline
            id='answerTrue'
            type='radio'
            name='answer'
            value='True'
            label='True'
            onChange={handleChange}
          />

          <Input.Radio
            inline
            id='answerFalse'
            label='False'
            type='radio'
            name='answer'
            value='False'
            onChange={handleChange}
          />

          <Input.Radio
            inline
            id='answerNeither'
            label='Uncertain'
            type='radio'
            name='answer'
            value='Neither'
            onChange={handleChange}
          />
        </Form.Group>

        <TextInput
          id='text'
          label='Explain your answer'
          placeholder='My supporting evidence is...'
          as='textarea'
          rows={3}
          onChange={handleChange}
          error={errors.text}
        />

        <TextInput
          id='citationUrl'
          label='Citation Url'
          placeholder='https://www.verifact.sg/article-123'
          onChange={handleChange}
          error={errors.citationUrl}
        />

        <Button.FormButtonSet>
          <Button.FormButton
            background='none'
            type='button'
            onClick={close}
          >
            Cancel
          </Button.FormButton>

          <Button.FormButton
            type='submit'
            disabled={isLoading}
          >
            Submit Answer
          </Button.FormButton>
        </Button.FormButtonSet>
      </Form>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 55rem;
  margin: 0 auto;
  padding: 5rem;
  background: var(--Background);
  border-radius: 2rem;
`
