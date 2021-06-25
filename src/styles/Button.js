import styled from 'styled-components'

export const FormButtonSet = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const FormButton = styled.button`
    background: none;
    border-radius: 10rem;
    border-style: none;
    height: 3.5rem;
    color: var(--TextPrimary);
    font-family: SF Pro Text;
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1.7rem;
    letter-spacing: 0;
    text-transform: uppercase;
    padding: 1rem 2rem;
    background: ${({ background }) => background ? `var(--${background})` : 'var(--Primary)'};

    :focus, :hover, :visited, :active{
      border: none;
      outline: none;
    }
`

export const VoteButton = styled.button`
    border-radius: .5rem;
    padding: 0.3rem 0.9rem;
    border-style: none;
    color: white;
    font-size: 1.4rem;

    background: ${({ background }) => ` var(--${background})`};
`
