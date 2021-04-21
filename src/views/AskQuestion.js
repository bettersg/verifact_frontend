import React from 'react'
import graphql from 'babel-plugin-relay/macro'

import useForm from '../hooks/useForm'
import { Button, Text } from '../styles'
import FullPageForm from '../components/ui/FullPageForm'
import TextInput from '../components/ui/TextInput'

const mutation = graphql`
  mutation AskQuestionMutation($input: QuestionCreateInput!){
    questionCreate(input: $input) {
      question {
        id
      }
    }
  }
`

function AskQuestion () {
  const {
    errors,
    handleChange,
    handleSubmit
  } = useForm({
    mutation,
    vars: {},
    defaultInput: {
      text: '',
      citationUrl: '',
      citationTitle: '',
      citationImageUrl: ''
    },
    required: ['text', 'citationUrl'],
    afterSubmit: response => {
      console.log('SUBMIT')
    }
  })

  console.log(errors)

  return (
    <FullPageForm
      error={errors.form}
      onSubmit={handleSubmit}
    >
      <Text.H1>Ask a Question</Text.H1>

      <Text.Paragraph>
        Find out how accurate the news your reading is. Ask our community if what you’re reading is true or false, and get a variety of viewpoints on the article.
      </Text.Paragraph>

      <TextInput
        id='text'
        label='Question'
        onChange={handleChange}
        error={errors.text}
        inputProps={{ as: 'textarea', rows: 3 }}
      />

      <TextInput
        id='citationUrl'
        label='Citation URL'
        onChange={handleChange}
        error={errors.citationUrl}
      />

      <Button.FormButtonSet>
        <Button.FormButton
          block size='md'
          background='Primary'
        >
          Submit Question
        </Button.FormButton>
      </Button.FormButtonSet>
    </FullPageForm>
  )
}

export default AskQuestion
