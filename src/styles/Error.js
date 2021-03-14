import styled from 'styled-components'

export const ErrorMessage = styled.h1`
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 3rem !important;
  margin-top: 3rem !important;
  text-align: center;
  color: #E55934;
  opacity: ${(props) => props.error === 'none' ? '0' : '1'}
`
