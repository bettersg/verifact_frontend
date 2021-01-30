import React, { useState } from "react";
import styled from "styled-components";
import { IoMdCloseCircle } from "react-icons/io";

import { setLocalData, getLocalData } from "../utils/localdata"

export default function Hero(props) {
  const [isClosed, setIsClosed] = useState(getLocalData('verifactHeroClosed'))
  const welcomeTitle = "Your home for verifying credible news"
  const welcomeContent = "Post a question to our community of news sleuths to get answers and new perspectives about the news your reading"

  const close = () => {
    setLocalData('verifactHeroClosed', true)
    setIsClosed(true);
  }

  return <>{isClosed ? null : (<Wrapper>
    <HeaderWrapper>
      <Button onClick={close}><CustomIoMdCloseCircle /></Button>
    </HeaderWrapper>
    <ContentWrapper>
      <Title>{welcomeTitle}</Title>
      <BodyText>{welcomeContent}</BodyText>
    </ContentWrapper>
  </Wrapper>)}</>
    ;
}

const Button = styled.button`
  background: none;
  border: none;
`;

const HeaderWrapper = styled.div`
  height: 5.4rem;
  text-align: right;
  padding-right: 1.5rem;
  padding-top: 1.7rem;
  padding-bottom: 1.7rem;
`;

const ContentWrapper = styled.div`
  display: grid;
  justify-items: center;
  text-align: center;
  padding-top: 8rem;
  padding-bottom: 11.8rem;
  @media only screen and (max-width: 600px){
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const Wrapper = styled.div`
  background: #FFB800;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-style: normal;
  font-weight: 700;
`;

const BodyText = styled.p`
  font-size: 1.4rem;
  line-height: 3.8rem;
`;

const CustomIoMdCloseCircle = styled(IoMdCloseCircle)`
  font-size: 2rem;
`;