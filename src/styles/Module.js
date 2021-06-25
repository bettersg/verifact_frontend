import styled from 'styled-components'

export const Box = styled.div`
  border-radius: 0.5rem;
  background-color: var(--White);
  border: 0.1rem solid var(--Border);
  padding: 2rem;
  margin-bottom: 2rem;
`

export const Page = styled(Box)`
  padding: 4rem 10rem;

  @media only screen and (max-width: 767px) {
    padding: 2rem;
  }
`
