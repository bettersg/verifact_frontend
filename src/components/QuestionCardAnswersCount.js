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

const RightCard = styled.div`
  display: flex;
  flex-direction: column;
`

const StatCount = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: -10px;
`

const ChoiceButton = styled.div`
  font-size: 11px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
`

function QuestionCardAnswersCount (props) {
  const answers = props.question.answers.edges
  const handleClickForTrue = () => {
    props.buttonClick('True')
  }
  const handleClickForFalse = () => {
    props.buttonClick('False')
  }
  const handleClickForNeither = () => {
    props.buttonClick('Neither')
  }

  const colours = {
    red: '#e55934',
    green: '#23be7b',
    grey: '#6c7186'
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
    <RightCard>
      <Text.Strong>{answers.length} answer</Text.Strong>
      <StatCount>
        <p style={{ color: colours.green, marginRight: '4px', fontSize: '1rem' }}>
          <FaCheck size='10px' />
          {` ${trueAnswers} True`}
        </p>
        <p style={{ color: colours.red, marginRight: '4px', fontSize: '1rem' }}>
          <FaTimes size='10px' /> {`${falseAnswers} False`}
        </p>
        <p style={{ color: colours.grey, fontSize: '1rem' }}>
          <FaQuestion size='10px' /> {`${neitherAnswers} Neither`}
        </p>
      </StatCount>
      <div>
        <hr className='solid' background-color='black' />
        <p style={{ fontSize: '1.2rem' }}>What's your take?</p>
      </div>
      <StatCount>
        <ChoiceButton onClick={handleClickForTrue}>
          <div style={{ marginLeft: '5px' }}>
            <FaCheckCircle color={colours.green} size='30px' />
          </div>
          It is true!
        </ChoiceButton>
        <ChoiceButton onClick={handleClickForFalse}>
          <div style={{ marginLeft: '10px' }}>
            <FaTimesCircle color={colours.red} size='30px' />
          </div>
          Fake news!
        </ChoiceButton>
        <ChoiceButton onClick={handleClickForNeither}>
          <div style={{ marginLeft: '16px' }}>
            <FaQuestionCircle color={colours.grey} size='30px' />
          </div>
          Not sure leh
        </ChoiceButton>
      </StatCount>
    </RightCard>
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
