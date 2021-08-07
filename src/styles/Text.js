import styled from "styled-components";

export const H1 = styled.h1`
  font-family: SF Pro Display;
  font-size: 3.6rem;
  font-weight: bold;
  margin-bottom: 2rem;

  @media only screen and (max-width: 767px) {
    font-size: 3.2rem;
  }
`;

export const H2 = styled.h2`
  font-size: 2.1rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

export const H3 = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
`;

export const Paragraph = styled.p`
  font-family: SF Pro Text;
  font-size: 1.6rem;
  font-weight: normal;
  margin-bottom: 2rem;
`;

export const SmallParagraph = styled(Paragraph)`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

export const Strong = styled.strong`
  font-weight: bold;
`;

export const Link = styled(Strong)`
  text-decoration: underline;
`;

export const Small = styled(SmallParagraph).attrs({
  as: "span",
})`
  margin-bottom: 0;
`;
export const line = styled.p`
  display: inline-block;
`;

export const Error = styled.p`
  margin: 5rem auto 3rem auto;
  font-weight: bold;
  text-align: center;
  color: var(--TextError);
  white-space: nowrap;
  overflow: hidden;
  width: 60%;
  text-overflow: ellipsis;
`;
