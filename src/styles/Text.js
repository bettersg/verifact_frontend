import styled from 'styled-components'

export const H1 = styled.h1`
  font-family: SF Pro Display;
  font-size: 3.2rem;
  font-weight: bold;
  margin-bottom: 3rem;
`

export const H2 = styled.h2`
  font-size: 2.1rem;
  font-weight: bold;
  margin-bottom: 2rem;
`

export const Paragraph = styled.p`
  font-family: SF Pro Text;
  font-size: 1.6rem;
  font-weight: normal;
  margin-bottom: 2rem;
`

export const ParagraphStrong = styled.p`
  font-family: SF Pro Text;
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
`

export const Small = styled.p`
  font-size: 1.4rem;
  margin: 0;
`

export const SmallStrong = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0;
`

export const Tiny = styled.p`
  font-size: 1.2rem;
  margin: 0;
`

export const Error = styled.p`
  margin: 5rem auto 3rem auto;
  font-weight: bold;
  text-align: center;
  color: var(--TextError);
  white-space: nowrap;
  overflow: hidden;
  width: 60%;
  text-overflow: ellipsis;
`
