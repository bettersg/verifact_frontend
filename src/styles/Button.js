import styled from 'styled-components'

export const Button = styled.button`
  background: ${props => props.disabled ? '#414141' : '#FFB800'};
  background: ${props => props.type === 'redirect' ? 'none' : ''};
  border: none;
  border-radius: 10px;
  margin-left: 8px;
  margin-top: 15px;
  font-weight: 600;
  padding-left: 5px;
  padding-right: 5px;
  color: ${props => props.type === 'login' ? '#30323D' : ''};
  height: 40px;
  width: 100px;
  float: right;

  :focus, :hover, :visited, :active{
    border: none;
    outline: none;
  }
`
