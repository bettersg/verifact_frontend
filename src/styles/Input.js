import { Form } from 'react-bootstrap'
import styled from 'styled-components'

export const InputText = styled.input`
    border-radius: 1rem;
    border: 1px solid #E5E5E5;
    padding: 1.8rem 1.4rem;

    height: ${({ height }) => `${height}`};
`

export const Radio = styled(Form.Check)`
  height: 24px;
  margin: 0 0.7rem 0 0;
  padding: 0;
  cursor: pointer;

  input[type='radio'] {
    margin: 0;
    width: 2.8rem;
    height: 2.8rem;
  }

  input[type='radio']:checked {
    background-color: var(--Primary);
    height: 2.8rem;
  }
`
