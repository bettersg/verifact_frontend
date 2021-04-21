import React from 'react'
import { Form, Container } from 'react-bootstrap'
import graphql from 'babel-plugin-relay/macro'

import useForm from '../hooks/useForm'
import { Button, Layout, Text } from '../styles'
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
    input,
    errors,
    handleChange,
    handleSubmit
  } = useForm({
    mutation: mutation,
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
    <Container>
      <Layout.FormWrap>
        <Form onSubmit={handleSubmit}>
          <Text.H1>Ask a Question</Text.H1>

          <Text.Paragraph>
            Find out how accurate the news your reading is. Ask our community if what you’re reading is true or false, and get a variety of viewpoints on the article.
          </Text.Paragraph>

          <TextInput
            id='text'
            label='Question'
            onChange={handleChange}
            error={errors.text}
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
        </Form>
      </Layout.FormWrap>
    </Container>
  )
}

export default AskQuestion
