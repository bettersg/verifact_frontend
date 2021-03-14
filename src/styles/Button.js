import styled from 'styled-components'

<<<<<<< HEAD
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
=======
export const FormButton = styled.button`
    background: none;
    border-radius: 1rem;
    border-style: none;
    height: 3.9rem;

    font-family: SF Pro Text;
    font-size: 1.4rem;

    font-weight: 700;
    line-height: 1.7rem;
    letter-spacing: 0;
    padding: 1rem 1.5rem;

    background: ${({ background }) => background ? `var(--${background})` : `var(--Primary)`};
`

export const VoteButton = styled.button`
    border-radius: .5rem;
    padding: 0.3rem 0.9rem;
    border-style: none;
    color: white;
    font-size: 1.4rem;

    background: ${({ background }) => ` var(--${background})`};
>>>>>>> main
`
