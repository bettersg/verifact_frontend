import React from 'react'
import { Form } from 'react-bootstrap'
import { graphql } from 'babel-plugin-relay/macro'

import useForm from '../hooks/useForm'
import { Text, Button, Input } from '../styles'
import TextInput from './ui/TextInput'
import FullPageForm from '../components/ui/FullPageForm'

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

export default function SubmitAnswerForm ({ close, questionId, choice }) {
  const {
    errors,
    handleSubmit,
    handleChange,
    isLoading,
    input
  } = useForm({
    mutation,
    defaultInput: {
      answer: choice,
      text: '',
      citationUrl: '',
      questionId
    },
    required: ['text', 'citationUrl'],
    massageInput: input => {
      const newInput = Object.assign({}, input)
      newInput.citationUrls = [newInput.citationUrl]
      delete newInput.citationUrl
      return newInput
    },
    afterSubmit: close
  })

  return (
    <FullPageForm onSubmit={handleSubmit}>
      <Text.H1>Answer the Question</Text.H1>

      <Form.Group>
        <Input.Radio
          inline
          id='answerTrue'
          type='radio'
          name='answer'
          value='True'
          label='True'
          checked={input.answer === 'True'}
          onChange={handleChange}
        />

        <Input.Radio
          inline
          id='answerFalse'
          label='False'
          type='radio'
          name='answer'
          value='False'
          checked={input.answer === 'False'}
          onChange={handleChange}
        />

        <Input.Radio
          inline
          id='answerNeither'
          label='Neither'
          type='radio'
          name='answer'
          value='Neither'
          checked={input.answer === 'Neither'}
          onChange={handleChange}
        />
      </Form.Group>

      <TextInput
        id='text'
        name='text'
        label='Explain your answer'
        placeholder='My supporting evidence is...'
        as='textarea'
        rows={3}
        onChange={handleChange}
        error={errors.text}
      />

      <TextInput
        id='citationUrl'
        name='citationUrl'
        label='Citation Url'
        placeholder='https://verifact.sg/article-123'
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
    </FullPageForm>
  )
}
