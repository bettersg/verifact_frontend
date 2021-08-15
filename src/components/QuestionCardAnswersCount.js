import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'
import styled from 'styled-components'
import {
  FaCheck,
  FaCheckCircle,
  FaTimes,
  FaTimesCircle,
  FaQuestionCircle,
  FaQuestion
} from 'react-icons/fa'
import { Text } from '../styles'

const RightCardFormat = styled.div`
  display: flex;
  flex-direction: column;
`

const StatCountFormat = styled.div`
  display: flex;
  justify-content: center;
`

const ChoiceButtonFormat = styled.p`
  font-size: 11px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
`

function QuestionCardAnswersCount (props) {
  const answers = props.question.answers.edges
  const clickMe = () => {
    props.buttonClick()
  }

  let trueAnswers = 0
  let falseAnswers = 0
  let neitherAnswers = 0
  answers.forEach(({ node }) => {
    switch (node.answer) {
      case 'True':
        trueAnswers++
        break
      case 'False':
        falseAnswers++
        break
      case 'Neither':
        neitherAnswers++
        break
      default:
        break
    }
  })

  return (
    <RightCardFormat>
      <Text.Strong>{answers.length} answer</Text.Strong>
      <StatCountFormat>
        <p style={{ color: 'green', marginRight: '4px' }}>
          <FaCheck size='10px' />
          {` ${trueAnswers} True`}
        </p>
        <p style={{ color: 'red', marginRight: '4px' }}>
          <FaTimes size='10px' /> {`${falseAnswers} False`}
        </p>
        <p style={{ color: 'grey' }}>
          <FaQuestion size='10px' /> {`${neitherAnswers} Neither`}
        </p>
      </StatCountFormat>
      <div>
        <hr class='solid' background-color='black' />
        <p>What's you take?</p>
      </div>
      <StatCountFormat>
        <ChoiceButtonFormat onClick={clickMe}>
          <FaCheckCircle color='green' size='30px' />
          It is true!
        </ChoiceButtonFormat>
        <ChoiceButtonFormat onClick={clickMe}>
          <FaTimesCircle color='red' size='30px' />
          Fake news!
        </ChoiceButtonFormat>
        <ChoiceButtonFormat onClick={clickMe}>
          <FaQuestionCircle color='grey' size='30px' />
          Not sure leh
        </ChoiceButtonFormat>
      </StatCountFormat>
    </RightCardFormat>
  )
}

export default createFragmentContainer(QuestionCardAnswersCount, {
  question: graphql`
    fragment QuestionCardAnswersCount_question on QuestionNode {
      answers {
        edges {
          node {
            answer
          }
        }
      }
    }
  `
})
