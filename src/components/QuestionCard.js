import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { Text } from '../styles'
import { monthDayYear } from '../utils/datetime'
import OpenGraphMeta from './OpenGraphMeta'
import QuestionCardAnswersCount from './QuestionCardAnswersCount'

const Wrap = styled.div`
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  display: grid;
  cursor: pointer;
`

function QuestionCard ({ question }) {
  const history = useHistory()

  const {
    id,
    createdAt,
    text,
    citations
  } = question
  const dt = new Date(createdAt)
  const formattedCreatedAt = monthDayYear.format(dt)

  return (
    <Wrap onClick={() => history.push(`/question/${id}`)}>
      <Text.H2>{text}</Text.H2>
      <QuestionCardAnswersCount question={question} />
      {citations.edges.map(({ node: citation }) => {
        return (
          <OpenGraphMeta
            key={citation.id}
            mediaUrl={citation.url}
            mediaTitle={citation.title}
            mediaImage={citation.imageUrl}
          />
        )
      })}
      <Text.Small>{`Asked on ${formattedCreatedAt}`}</Text.Small>
    </Wrap>
  )
}

export default createFragmentContainer(
  QuestionCard,
  {
    question: graphql`
      fragment QuestionCard_question on QuestionNode {
        id
        createdAt
        text
        citations {
          edges {
            node {
              id
              url
              title
              imageUrl
            }
          }
        }
        ...QuestionCardAnswersCount_question
      }
    `
  }
)
