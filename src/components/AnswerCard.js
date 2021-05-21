import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import styled from 'styled-components'
import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'

import { Text, Button } from '../styles'
import useForm from '../hooks/useForm'

const mutation = graphql`
  mutation AnswerCardMutation ($input:VoteCreateUpdateDeleteInput!){
    voteCreateUpdateDelete (input:$input){
      vote {
        id
        answer {
          ...AnswerCard_answer
        }
      }
    }
  }
`

function AnswerCard ({ answer: answerNode }) {
  const {
    id,
    answer,
    user,
    text,
    citations,
    votes,
    viewerVote
  } = answerNode
  const {
    input,
    handleChange,
    handleSubmit
  } = useForm({
    mutation,
    defaultInput: {
      answerId: id,
      credible: null
    }
  })
  // Memo fn avoids infinite loop in useEffect callback
  const memoHandleSubmit = React.useCallback(handleSubmit, [input])

  React.useEffect(() => {
    if (input.credible !== null) memoHandleSubmit()
  }, [input.credible, memoHandleSubmit])

  let credibleCount = 0
  let notCredibleCount = 0
  votes.edges.forEach(({ node: vote }) => {
    if (vote.credible) return credibleCount++
    return notCredibleCount++
  })

  function vote (value) {
    const newInput = (viewerVote.edges.length > 0 && value === viewerVote.edges[0].node.credible)
      ? { name: 'credible' }
      : { name: 'credible', value }

    handleChange({
      target: newInput
    })
  }

  return (
    <AnswerCardWrap key={id}>
      <AnswerHeader answerIsTrue={answer === 'True'}>
        {answer}
      </AnswerHeader>

      <Text.Small>Answered by <b>{user.username}</b> </Text.Small>
      <Text.Small>{text}</Text.Small>
      {citations.edges.map(({ node: citation }) => {
        return (
          <MediaWrap key={citation.id}>
            <FiArrowUpRight size={10} />
            <MediaLink
              onClick={e => e.stopPropagation()}
              href={citation.url}
            >
              {citation.url}
            </MediaLink>
          </MediaWrap>
        )
      })}
      <ButtonWrap>
        <Button.VoteButton background='Green' onClick={() => vote(true)}>
          <VoteButtonInnerWrap>
            <Text.SmallStrong>{credibleCount}</Text.SmallStrong>
            <Text.Small>Credible</Text.Small>
          </VoteButtonInnerWrap>
        </Button.VoteButton>

        <Button.VoteButton background='Red' onClick={() => vote(false)}>
          <VoteButtonInnerWrap>
            <Text.SmallStrong>{notCredibleCount}</Text.SmallStrong>
            <Text.Small>Not Credible</Text.Small>
          </VoteButtonInnerWrap>
        </Button.VoteButton>
      </ButtonWrap>
    </AnswerCardWrap>
  )
}

const AnswerCardWrap = styled.div`
  display: grid;
  grid-template-rows: repeat(5, auto);
  grid-gap: 1rem;
`

const AnswerHeader = styled(Text.H2)`
  margin: 0;
  text-transform: uppercase;
  color: ${({ answerIsTrue }) => answerIsTrue ? 'var(--Green)' : 'var(--Red)'};
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
        user {
          id
          username
        }
        citations {
          edges {
            node {
              id
              url
            }
          }
        }
        viewerVote {
          edges {
            node {
              id
              user {
                id
              }
              credible
            }
          }
        }
        votes {
          edges {
            node {
              id
              credible
              user {
                id
              }
            }
          }
        }
      }
    `
  }
)
