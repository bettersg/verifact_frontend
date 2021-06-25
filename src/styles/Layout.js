import styled from 'styled-components'
import { Form } from 'react-bootstrap'

export const FormWrap = styled.div`
  width: 50%;
  margin: 45px auto;
  background: #EEF0F2;
  border-radius: 20px;
  padding: 50px;
  font-weight: 600;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;

  @media only screen and (max-width: 1199px){
    width: 75%;
  }

  @media only screen and (max-width: 767px){
    width: 96%;
  }

`

export const FormControl = styled(Form.Control)`
  border: 1px solid #E5E5E5;
  border-radius: 1rem;
  padding: 1.5rem;
  color: var(--TextPrimary);
  font-style: normal;
  font-weight: normal;
  font-size: 1.6rem;
  line-height: 2.2rem;
  display: block;
  width: 100%;

  :is(input) {
    height: 5rem
  }
`
