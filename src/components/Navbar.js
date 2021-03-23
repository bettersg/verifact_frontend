import React from 'react'
import styled from 'styled-components'
import { Navbar, Nav, Button } from 'react-bootstrap'

export default (props) => {
  return (
    <CustomNavbar sticky='top' collapseOnSelect expand='md'>
      <Navbar.Brand href='/' style={{ color: '#30323D', fontSize: '1.9rem' }}>SG VERIFACT</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav' style={{ backgroundColor: 'white' }}>
        <Nav className='mr-auto' />
        <Nav style={{ alignItems: 'center' }}>
          <Nav.Link style={{ color: '#30323D' }} href='login'>Log In</Nav.Link>
          <Nav.Link style={{ color: '#30323D' }} href='signup'>
            Sign Up
          </Nav.Link>
          <Nav.Link href='/askquestion'>
            <CustomButton>Ask a Question</CustomButton>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </CustomNavbar>
  )
}

const CustomNavbar = styled(Navbar)`
  background-color: white;
  padding: 0 2.8rem;
  font-family: SF Pro Text;
  font-weight: bold;
  font-size: 1.4rem;
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.08);
  
  @media (max-width: 767px) {
    padding: 1.1rem 2.8rem;
  }
`

const CustomButton = styled(Button)`
  background-color: #EEF0F2;
  color: #30323D;
  border: none;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  transition-duration: 0.4s;
  font-weight: bold;
  font-size: 1.4rem;
  &:hover{
    background-color: lightgrey;
    color: #30323D;
  }
`
