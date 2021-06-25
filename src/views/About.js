import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import { Text, Module } from '../styles'
import BetterSgLogo from '../assets/BetterSgLogo.png'

function About () {
  return (
    <Container>
      <Row>
        <Col>
          <Module.Page>
            <Section>
              <Text.H1>What is VeriFact?</Text.H1>
              <Text.Paragraph>
                VeriFact is a <Text.Strong>crowdsourced fact-checking community</Text.Strong>, where anyone can query about rumours and misinformation circulating in Singapore, and everyone plays a part in verifying the information.
              </Text.Paragraph>
            </Section>

            <Section>
              <Text.H2>What is our mission? <span role='img' aria-label='rocket'>🚀</span></Text.H2>
              <Text.Paragraph>
                At VeriFact, we aim to first and foremost help verify rumours and misinformation circulating in Singapore, to reduce any informational uncertainty that may be harmful to our society. But in the broader scheme of things, we hope to cultivate a culture of fact-checking and information literacy, to strengthen the societal resilience within Singapore.
              </Text.Paragraph>
            </Section>

            <Section>
              <Text.H2>Who are we connected to?</Text.H2>
              <img src={BetterSgLogo} style={{ width: '18.5rem' }} alt='Better.sg logo' />
              <Text.Paragraph>
                VeriFact is an independent and non-partisan product by <a href='https://better.sg' target='blank'><Text.Link>better.sg</Text.Link></a>, a volunteer-run non-profit charity that aims to use technology in helping to build a better Singapore, what we call tech-for-good.
              </Text.Paragraph>
            </Section>

            <Section>
              <Text.H2>Disclaimer <span role='img' aria-label='megaphone'>📢</span></Text.H2>
              <Text.Paragraph>
                The information shared by users on the platform do not represent the views of VeriFact or better.sg, and neither are we attempting to act as an arbiter of truth. VeriFact’s only objective is to help make information of interest more accessible, and to reduce the uncertainty in such information.
              </Text.Paragraph>
            </Section>

            <Section>
              <Text.H2>Contact Us <span role='img' aria-label='mail'>📨</span></Text.H2>
              <Text.Paragraph>If this initiative interests you, feel free to <a href='mailto:yeesiang@better.sg'><Text.Link>get in touch</Text.Link></a> with us!</Text.Paragraph>
            </Section>
          </Module.Page>
        </Col>
      </Row>
    </Container>
  )
}

const Section = styled.section`
  margin-bottom: 3rem;
`

export default About
