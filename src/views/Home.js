import React from 'react'
import styled from 'styled-components'
import graphql from 'babel-plugin-relay/macro'

import { PageWrap } from '../styles/Layout'
import Query from '../components/Query'
import QuestionCard from '../components/QuestionCard'
import Hero from '../components/Hero'

const query = graphql`
  query HomeQuery {
    questions {
      edges {
        node {
          id
          ...QuestionCard_question
        }
      }
    }
  }
`

const List = styled.div`
  > * {
    border-bottom: 1px solid var(--Border);

    &:last-child {
      border-bottom: 0;
    }
  }
`

function Home () {
  return (
    <>
      <Hero />

      <PageWrap>
        <Query
          query={query}
          render={({ props }) => {
            return (
              <List>
                {props.questions.edges.map(({ node }) => {
                  return <QuestionCard key={node.id} question={node} visual />
                })}
              </List>
            )
          }}
        />
      </PageWrap>
    </>
  )
}

export default Home
