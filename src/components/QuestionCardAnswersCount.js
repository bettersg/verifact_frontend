import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'
import styled from 'styled-components'
import {
  FaCheck,
  FaTimes,
  FaQuestion
} from 'react-icons/fa'

import { Paragraph, MetaText } from '../styles/Text'

const RightCard = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
`

const Title = styled(Paragraph)`
  margin-bottom: 0.5rem;
  font-weight: bold;
`

const StatCount = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  align-items: center;
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;
  border-bottom: 0.1rem solid var(--Border);
  text-align: center;

  > div {
    width: 33%;
  }
`

const ChoiceButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.25rem;
`

const ChoiceButton = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  text-align: center;
  align-items: center;
`

const ChoiceButtonCircle = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

const colors = {
  red: '#e55934',
  green: '#23be7b',
  grey: '#6c7186'
}

const circleIconProps = {
  color: 'white',
  size: '14px'
}

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
      <Title>{answers.length} answer</Title>

      <StatCount>
        <div style={{ color: colors.green }}>
          <FaCheck size='10px' />
          {` ${trueAnswers} True`}
        </div>

        <div style={{ color: colors.red }}>
          <FaTimes size='10px' /> {`${falseAnswers} False`}
        </div>

        <div style={{ color: colors.grey }}>
          <FaQuestion size='10px' /> {`${neitherAnswers} Neither`}
        </div>
      </StatCount>

      <MetaText as='div'>What's your take?</MetaText>

      <ChoiceButtons>
        <ChoiceButton onClick={handleClickForTrue}>
          <ChoiceButtonCircle color={colors.green}>
            <FaCheck {...circleIconProps} />
          </ChoiceButtonCircle>
          It's true!
        </ChoiceButton>
        <ChoiceButton onClick={handleClickForFalse}>
          <ChoiceButtonCircle color={colors.red}>
            <FaTimes {...circleIconProps} />
          </ChoiceButtonCircle>
          Fake news!
        </ChoiceButton>
        <ChoiceButton onClick={handleClickForNeither}>
          <ChoiceButtonCircle color={colors.grey}>
            <FaQuestion {...circleIconProps} size='13px' />
          </ChoiceButtonCircle>
          Not sure leh
        </ChoiceButton>
      </ChoiceButtons>
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
