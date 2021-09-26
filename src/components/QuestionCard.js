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
import { AuthContext } from '../context/Auth'

const Wrap = styled.div`
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  display: grid;
  cursor: pointer;
`

const CardBody = styled.div`
  display: flex;
  justify-content: space-evenly;

  @media only screen and (max-width: 600px){
    flex-direction: column;
  }
`

const CardLeft = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const CardRight = styled.div`
  min-width: 18.5rem;
`

function QuestionCard ({ question }) {
  const history = useHistory()

  const { id, createdAt, text, citations, user } = question
  const dt = new Date(createdAt)
  const formattedCreatedAt = monthDayYear.format(dt)
  let show = false
  const authValue = React.useContext(AuthContext)

  const onClickShowForm = (opinion) => {
    if (authValue.isLoggedIn) {
      show = true
      history.push({ pathname: `/question/${id}`, state: show, choice: opinion })
    } else {
      history.push({ pathname: '/login' })
    }
  }

  return (
    <Wrap>
      <Card>
        <Card.Body>
          <CardBody>
            <CardLeft
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
              <Text.Line>
                <Text.MetaText>
                  <Text.Strong>{user.username}</Text.Strong>
                  {` asked on ${formattedCreatedAt}`}
                </Text.MetaText>
              </Text.Line>
            </CardLeft>
            <CardRight>
              <QuestionCardAnswersCount
                question={question}
                buttonClick={onClickShowForm}
              />
            </CardRight>
          </CardBody>
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
