import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import graphql from 'babel-plugin-relay/macro'
import { Container, Row, Col } from 'react-bootstrap'

import { Module, Text, Button } from '../styles'
import Query from '../components/Query'
import QuestionCard from '../components/QuestionCard'
import Hero from '../components/Hero'
import Logo from '../assets/VeriFactLogo.svg'

const query = graphql`
  query HomeQuery {
    questions (orderBy: "-created_at"){
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

      <Container>
        <Row>
          <Col lg='9'>
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
          </Col>

          <Col lg='3'>
            <Module.Box>
              <Text.H3>
                <img src={Logo} className='mr-2' alt='VeriFact logo' height='25rem' />
                About VeriFact
              </Text.H3>

              <Text.SmallParagraph>VeriFact SG is a crowdsourced fact-checking community, where anyone can query about rumours and misinformation circulating in Singapore, and everyone plays a part in verifying the information.</Text.SmallParagraph>
              <Link to='/about'>
                <Button.FormButton>LEARN MORE</Button.FormButton>
              </Link>
            </Module.Box>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
