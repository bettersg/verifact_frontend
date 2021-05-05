import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { useHistory } from 'react-router-dom'

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
  const history = useHistory()
  const {
    errors,
    handleChange,
    handleSubmit,
    isLoading
  } = useForm({
    mutation,
    defaultInput: {
      text: '',
      citationUrl: '',
      citationTitle: '',
      citationImageUrl: ''
    },
    required: ['text', 'citationUrl'],
    afterSubmit: res => {
      const id = res.questionCreate.question.id
      history.push(`/question/${id}`)
    }
  })

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
        name='text'
        label='Question'
        onChange={handleChange}
        error={errors.text}
        as='textarea'
        rows={3}
      />

      <TextInput
        id='citationUrl'
        name='citationUrl'
        label='Citation Url'
        onChange={handleChange}
        error={errors.citationUrl}
        placeholder='https://www.verifact.sg/article-123'
      />

      <Button.FormButtonSet>
        <Button.FormButton
          block size='md'
          background='Primary'
          disabled={isLoading}
        >
          Submit Question
        </Button.FormButton>
      </Button.FormButtonSet>
    </FullPageForm>
  )
}

export default AskQuestion
