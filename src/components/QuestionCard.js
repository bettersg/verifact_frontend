import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Card } from 'react-bootstrap'

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

const CardBodyFormat = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const CardLeftFormat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 70%;
`

function QuestionCard ({ question }) {
  const history = useHistory()

  const { id, createdAt, text, citations, user } = question
  const dt = new Date(createdAt)
  const formattedCreatedAt = monthDayYear.format(dt)
  let show = false

  const onClickShowForm = () => {
    show = true
    history.push({ pathname: `/question/${id}`, state: show })
  }

  return (
    <Wrap>
      <Card>
        <Card.Body>
          <CardBodyFormat>
            <CardLeftFormat
              onClick={() =>
                history.push({ pathname: `/question/${id}`, state: show })}
            >
              <Text.H2>{text}</Text.H2>
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
              <Text.line>
                <Text.Strong>{user.username}</Text.Strong>
                <Text.Small>{` asked on ${formattedCreatedAt}`}</Text.Small>
              </Text.line>
            </CardLeftFormat>
            <QuestionCardAnswersCount
              question={question}
              buttonClick={onClickShowForm}
            />
          </CardBodyFormat>
        </Card.Body>
      </Card>
    </Wrap>
  )
}

export default createFragmentContainer(QuestionCard, {
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
      user {
        username
      }
      ...QuestionCardAnswersCount_question
    }
  `
})
