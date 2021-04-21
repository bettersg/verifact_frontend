import React from 'react'
import styled from 'styled-components'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { AuthContext } from '../context/Auth'

export default (props) => {
  const authValue = React.useContext(AuthContext)
  const handleLogOut = authValue.logOut
  return (
    <CustomNavbar sticky='top' collapseOnSelect expand='md'>
      <Navbar.Brand href='/' style={{ color: '#30323D', fontSize: '1.9rem' }}>SG VERIFACT</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav' style={{ backgroundColor: 'white' }}>
        <Nav className='float-left' />
        <Nav style={{ alignItems: 'center' }}>
          {authValue.isLoggedIn
            ? (<NavLink onClick={handleLogOut}>Log Out</NavLink>)
            : (
              <>
                <NavLink href='/login'>Log In</NavLink>
                <NavLink href='/signup'>Sign Up</NavLink>
              </>
              )}
          <NavLink href='/ask-a-question'>
            <CustomButton>Ask a Question</CustomButton>
          </NavLink>
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
  color: var(--TextPrimary);
  border: none;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  transition-duration: 0.4s;
  font-weight: bold;
  font-size: 1.4rem;
  &:hover{
    background-color: lightgrey;
    color: var(--TextPrimary);
  }
`

const NavLink = styled(Nav.Link)`
  color: var(--TextPrimary) !important;
`
