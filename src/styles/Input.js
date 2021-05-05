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
  margin-right: 2rem;
  padding: 0;

  input,
  label {
    cursor: pointer;
  }

  input {
    margin-right: 0.5rem;
    width: 2.8rem;
    height: 2.8rem;

    &:checked {
      background-color: var(--Primary);
      height: 2.8rem;
    }
  }
`
