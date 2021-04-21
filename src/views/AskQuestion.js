import React from 'react'
import { Form, Container } from 'react-bootstrap'

import { Button, Layout, Text } from '../styles'
import TextInput from '../components/ui/TextInput'

function AskQuestion () {
  return (
    <Container>
      <Layout.FormWrap>
        <Form onSubmit={() => {}}>
          <Text.H1>Ask a Question</Text.H1>

          <Text.Paragraph>
            Find out how accurate the news your reading is. Ask our community if what you’re reading is true or false, and get a variety of viewpoints on the article.
          </Text.Paragraph>

          <TextInput
            id='news-url'
            label='News URL'
            onChange={() => {}}
          />

          <TextInput
            id='question'
            label='Question'
            onChange={() => {}}
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
