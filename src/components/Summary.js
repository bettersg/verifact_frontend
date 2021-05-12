import React from 'react'
import styled from 'styled-components'

export default function Summary (props) {
  const { votes } = props

  return (
    <Wrapper>
      <Item>
        <Agree>{votes[0]} </Agree>Agree
      </Item>
      <Item>
        <Unsure>{votes[1]} </Unsure>Unsure
      </Item>
      <Item>
        <Disagree>{votes[2]} </Disagree>Disagree
      </Item>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 118px)
`

const Item = styled.div`
    background: white;
    margin-right: 10px;
    padding: 10px
`

const Agree = styled.b`
    color: green;
    fontWeight:bold
`

const Unsure = styled.b`
    color: grey;
    fontWeight:bold
`

const Disagree = styled.b`
    color: red;
    fontWeight:bold
`
