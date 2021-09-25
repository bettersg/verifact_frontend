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
                VeriFact is a <Text.Strong>crowdsourced fact-checking platform</Text.Strong>, where anyone can query about rumours and misinformation circulating in Singapore, and everyone plays a part in verifying the information.
              </Text.Paragraph>
            </Section>

            <Section>
              <Text.H2>What is our mission? <span role='img' aria-label='rocket'>🚀</span></Text.H2>
              <Text.Paragraph>
                At VeriFact, we aim to first and foremost help verify the veracity of rumours and misinformation that may be harmful to our society. More broadly, we hope to raise information literacy, and cultivate a collective culture of bringing truth to light, so as to strengthen the societal resilience within Singapore.
              </Text.Paragraph>
            </Section>

            <Section>
              <Text.H2>What does our logo represent?</Text.H2>
              <Text.Paragraph>
                The VeriFact logo is actually a firefly, which represents an organic source of light that casts light on the uncertainties of information, and the way fireflies gather in swarms portrays VeriFact as a crowdsourcing platform.
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
              <Text.Paragraph>If this initiative interests you, feel free to <a href='mailto:verifact.sg@gmail.com'><Text.Link>get in touch</Text.Link></a> with us!</Text.Paragraph>
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
