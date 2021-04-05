import React from 'react'
import Logo from '../assets/VeriFactLogo.svg'

export default function NotFound (props) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <h1 style={{ fontSize: '6rem' }}>
        Page Not Found!
      </h1>
      <p style={{ fontSize: '3rem', lineHeight: 'normal' }}>
        Seems like you're lost, follow this little bee to return home.
      </p>
      <a href='/'>
        <img src={Logo} alt='VeriFact Logo' height='45rem' />
      </a>
    </div>
  )
}
