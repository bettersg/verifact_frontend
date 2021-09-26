import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import graphql from 'babel-plugin-relay/macro'

import Query from '../components/Query'
import QuestionCard from '../components/QuestionCard'
import SubmitAnswerForm from '../components/SubmitAnswerForm'
import AnswerCard from '../components/AnswerCard'
import { Text, Button } from '../styles'
import { AuthContext } from '../context/Auth'
import { useHistory } from 'react-router-dom'

const query = graphql`
  query QuestionQuery($questionId: ID!) {
    node(id: $questionId) {
      ...QuestionCard_question
      ... on QuestionNode {
        answers {
          edges {
            node {
              id
              ...AnswerCard_answer
            }
          }
        }
      }
    }
  }
`

export default function Question (props) {
  const questionId = props.match.params.id
  const [showAnswerForm, setShowAnswerForm] = useState(false)
  const [answerChoice, setAnswerChoice] = useState('True')
  const authValue = React.useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    setShowAnswerForm(props.location.state)
    setAnswerChoice(props.location.choice)
  }, [props.location.state, props.location.choice, props.location])

  function open () {
    if (authValue.isLoggedIn) {
      setShowAnswerForm(true)
      setAnswerChoice('True')
    } else {
      history.push({ pathname: '/login' })
    }
  }

  function close () {
    setShowAnswerForm(false)
  }

  return (
    <Query
      query={query}
      variables={{ questionId }}
      render={({ props }) => {
        return (
          <Wrapper>
            <QuestionCard key={questionId} question={props.node} visual />

            <HeaderWrapper enableForm={showAnswerForm}>
              {showAnswerForm
                ? (
                  <>
                    <FormWrapper>
                      <SubmitAnswerForm choice={answerChoice} close={close} questionId={questionId} />
                    </FormWrapper>

                    <H2TextWithoutMargin>All Answers</H2TextWithoutMargin>
                  </>
                  )
                : (
                  <>
                    <H1TextWithMargin>All Answers</H1TextWithMargin>

                    <CustomButton onClick={open}>
                      <Text.Strong>Answer the Question</Text.Strong>
                    </CustomButton>
                  </>
                  )}
            </HeaderWrapper>

            {props.node.answers.edges.map(({ node }) => {
              return (
                <AnswerWrapper key={node.id}>
                  <AnswerCard answer={node} visual={false} />
                </AnswerWrapper>
              )
            })}
          </Wrapper>
        )
      }}
    />
  )
}

const H2TextWithoutMargin = styled(Text.H2)`
  margin: 0;
`

const H1TextWithMargin = styled(Text.H1)`
  margin: auto 0;
`

const Wrapper = styled.div`
  padding: 0 16.6rem;
  @media (max-width: 767px) {
    padding: 0 2rem;
    margin: 0;
  }
`

const HeaderWrapper = styled.div`
  display: grid;
  margin-bottom: 3rem;
  grid-template-rows: auto auto;

  ${({ enableForm }) =>
    !enableForm &&
    `
    grid-template-columns: auto auto;
  `}
`

const FormWrapper = styled.div`
  display: grid;
  justify-items: center;
  margin-bottom: 6rem;
`

const CustomButton = styled(Button.FormButton)`
  width: 20rem;
  justify-self: end;
`

const AnswerWrapper = styled.div`
  display: grid;
  background: #eef0f2;
  padding: 2rem 2rem 2.386rem 2rem;
  margin: 3rem 0;
  border-radius: 2rem;
  word-wrap: break-word;
  word-break: break-all;
`
