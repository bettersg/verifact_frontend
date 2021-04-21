import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'
import { graphql } from 'babel-plugin-relay/macro'

import { Text, Button, Input } from '../styles'
import mutate from '../utils/mutate'

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

export default function SubmitAnswerForm (props) {
  const { close, questionID } = props
  const [answer, setAnswer] = useState('True')
  const [articleLink, setArticleLink] = useState('')
  const [statement, setStatement] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const variables = {
      'input': {
        'answer': answer,
        'text': statement,
        'citationUrl': articleLink,
        'citationTitle': articleLink,
        'questionId': questionID
      }
    }
    await mutate(mutation, variables)
    close()
  }

  return (
    <MainWrapper>
      <div>
        <Text.H1>Answer the Question</Text.H1>
      </div>

      <FormWrap id='answerForm' onSubmit={handleSubmit}>
        <FormGroup>
          <TDIV>
            <div>
              <Input.Radio
                defaultChecked
                type='radio'
                name='formHorizontalRadios'
                id='formHorizontalRadios1'
                onClick={() => setAnswer('True')}
              />
            </div>

            <div>
              <FormOptionLabel>True</FormOptionLabel>
            </div>
          </TDIV>

          <TDIV>
            <div>
              <Input.Radio
                inline
                type='radio'
                name='formHorizontalRadios'
                id='formHorizontalRadios2'
                onClick={() => setAnswer('False')}
              />
            </div>

            <div>
              <FormOptionLabel>False</FormOptionLabel>
            </div>
          </TDIV>

          <TDIV>
            <div>
              <Input.Radio
                inline
                type='radio'
                name='formHorizontalRadios'
                id='formHorizontalRadios3'
                onClick={() => setAnswer('Neither')}
              />
            </div>
            <div>
              <FormOptionLabel>Uncertain</FormOptionLabel>
            </div>
          </TDIV>
        </FormGroup>

        <FormTextWrap>
          <FormSubLabel>Explain your answer</FormSubLabel>
          <Input.InputText height={'12.8rem'} onChange={(e) => setStatement(e.target.value)} as='textarea' placeholder='For example x, y and z' required />
        </FormTextWrap>

        <FormTextWrap>
          <FormSubLabel>Citation (News URL)</FormSubLabel>
          <Input.InputText height={'5rem'} onChange={(e) => setArticleLink(e.target.value)} type='text' placeholder='https://example.com/article' required />
        </FormTextWrap>

        <ButtonWrapper>
          <Button.FormButton background={'none'} type='button' onClick={close}>
              Cancel
          </Button.FormButton>

          <Button.FormButton type='submit' form='answerForm'>
            <Text.ParagraphStrong>Submit Answer</Text.ParagraphStrong>
          </Button.FormButton>
        </ButtonWrapper>
      </FormWrap>
    </MainWrapper>
  )
}

const TDIV = styled.div`
    display: flex;
    align-items: center;
`

const FormGroup = styled(Form.Group)`
    display: flex;
    gap: 2rem;
`

const MainWrapper = styled.div`
    display: grid;
    width: 55rem;
    row-gap: 3rem;
    padding: 5rem;
    background: #EEF0F2;
    border-radius: 2rem;
`

const FormWrap = styled(Form)`
    display: grid;
    row-gap: 3rem;
`

const ButtonWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2,auto);
    gap: 1rem;
    justify-content: end;
`

const FormTextWrap = styled.div`
    display: grid;
    grid-gap: 0.5rem;
`

const FormSubLabel = styled(Text.Small)`
    font-weight: 600;
    font-size: 1.6rem;
`

const FormOptionLabel = styled(Text.Small)`
    font-family: Roboto;
    font-weight: 500;
    font-size: 1.6rem;
`
