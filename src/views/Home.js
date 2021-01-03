import React from 'react'
import styled from 'styled-components'
import graphql from 'babel-plugin-relay/macro'

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

const ContentWrapper = styled.div`
  padding: 0 16.6rem;
  @media (max-width: 767px) {
    padding: 0 2rem;
    margin: 0;
  }
`

function Home (props) {
  return <div>
    <Hero />
    <ContentWrapper>
      <Query
        query={query}
        render={({error, props}) => {
          if (!props) {
            return <div>Loading...</div>
          } else if (error) {
            return <div>{error.message}</div>
          } else {
            return props.questions.edges.map(({ node }) => {
              return <QuestionCard key={node.id} question={node} visual />
            })
          }
        }}
      />
    </ContentWrapper>
  </div>
}

export default Home