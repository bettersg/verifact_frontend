import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import styled from 'styled-components'
import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'

import { Text, Button } from '../styles'

function AnswerCard ({ answer: answerNode }) {
  const {
    id,
    answer,
    text,
    citationUrl,
    votes
  } = answerNode
  const setColor = (answer === 'True')
  let credibleCount = 0
  let notCredibleCount = 0
  votes.edges.forEach(({ node: vote }) => {
    if (vote.credible) return credibleCount++
    return notCredibleCount++
  })

  return <AnswerCardWrap key={id}>
    <AnswerHeader children={answer} setColor={setColor} />
    <Text.Small>Answered by <b>DEMO</b> </Text.Small>
    <Text.Small children={text} />
    <MediaWrap>
      <div>
        <FiArrowUpRight size={10} />
        <MediaLink onClick={event => { event.stopPropagation() }} href={citationUrl} >{citationUrl}</MediaLink>
      </div>
    </MediaWrap>
    <ButtonWrap>
      <Button.VoteButton background={'Green'}>
        <VoteButtonInnerWrap>
          <Text.SmallStrong children={credibleCount} />
          <Text.Small>Credible</Text.Small>
        </VoteButtonInnerWrap>
      </Button.VoteButton>
      <Button.VoteButton background={'Red'}>
        <VoteButtonInnerWrap>
          <Text.SmallStrong children={notCredibleCount} />
          <Text.Small>Not Credible</Text.Small>
        </VoteButtonInnerWrap>
      </Button.VoteButton>
    </ButtonWrap>
  </AnswerCardWrap>
}

const AnswerCardWrap = styled.div`
  display: grid;
  grid-template-rows: repeat(5, auto);
  grid-gap: 1rem;
`

const AnswerHeader = styled(Text.H2)`
  margin: 0;
  text-transform: uppercase;
  color: ${({ setColor }) => setColor ? `var(--Green)` : `var(--Red)`};
`

const MediaWrap = styled.div`
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  column-gap: 0.5rem;
  align-items: center;
`

const MediaLink = styled.a`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 700;
  color: var(--TextPrimary);

  &:hover{
    color: var(--TextPrimary);
    text-decoration: none;
  }
`

const ButtonWrap = styled.div`
  display: flex;
  gap: 1rem;
`

const VoteButtonInnerWrap = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 0.3rem;
`

export default createFragmentContainer(
  AnswerCard,
  {
    answer: graphql`
      fragment AnswerCard_answer on AnswerNode {
        id
        answer
        text
        citationUrl
        citationTitle
        votes {
          edges {
            node {
              id
              credible
            }
          }
        }
      }
    `
  }
)
