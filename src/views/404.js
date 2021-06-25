import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'

import Logo from '../assets/VeriFactLogo.svg'
import { H1 } from '../styles/Text'

export default function NotFound (props) {
  return (
    <Container>
      <Page404Wrapper>
        <H1>Page Not Found!</H1>
        <CustomH2>
          Seems like you're lost, follow this little bee to return home.
        </CustomH2>
        <a href='/'>
          <img src={Logo} alt='VeriFact Logo' height='60rem' />
        </a>
      </Page404Wrapper>
    </Container>
  )
}

const Page404Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-top: 25rem;
`
const CustomH2 = styled.h2`
  font-size: 2.1rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 2rem;
`
