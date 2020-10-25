import React from "react";
import styled from "styled-components";
import QuestionCard from "../components/QuestionCard";
import Hero from "../components/Hero";

export default function Home(props) {
  const list_questionID = ['1', '2']

  return <div>
    <Hero />
    <ContentWrapper>
      {list_questionID.map((questionID) =>
        <div style={{ borderBottom: "1px solid #6C718A" }} key={questionID}>
          <QuestionCard id={questionID} question_id={questionID} visual={true} />
        </div>
      )}
    </ContentWrapper>
  </div>
    ;
}

const ContentWrapper = styled.div`
  padding: 0px 166px;
  padding-bottom: 20px;
  @media (max-width:991px) {
    padding: 0px;
  }
`;