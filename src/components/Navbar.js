import React from 'react'
import styled from 'styled-components'
import { Navbar, Nav, Button } from 'react-bootstrap'
import Logo from '../assets/VeriFactLogo.svg'

import { AuthContext } from '../context/Auth'
import { Text } from '../styles'

export default (props) => {
  const authValue = React.useContext(AuthContext)
  const handleLogOut = authValue.logOut
  return (
    <CustomNavbar sticky='top' collapseOnSelect expand='md'>
      <Brand href='/' style={{ color: '#30323D', fontSize: '1.9rem' }}>
        <img src={Logo} className='mr-2' alt='VeriFact logo' height='25rem' />
        VERIFACT SG<Beta>beta</Beta>
      </Brand>

      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse
        id='responsive-navbar-nav'
        className='justify-content-end'
        style={{ backgroundColor: 'white' }}
      >
        <Nav style={{ alignItems: 'center' }}>
          <NavLink target='blank' href='https://forms.gle/tVzucdnhb6p5p2pRA'>Share Feedback</NavLink>

          {authValue.isLoggedIn
            ? <NavLink onClick={handleLogOut}>Log Out</NavLink>
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

const Brand = styled(Navbar.Brand)`
  position: relative;
  line-height: 1em;
  padding-top: 0;
  padding-bottom: 0;
`

const Beta = styled(Text.Small)`
  position: absolute;
  left: 100%;
  bottom: 100%;
  margin-bottom: -1.5rem;
  margin-left: 0.5rem;
`

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
  &:hover {
    background-color: lightgrey;
    color: var(--TextPrimary);
  }
`

const NavLink = styled(Nav.Link)`
  color: var(--TextPrimary) !important;
`
