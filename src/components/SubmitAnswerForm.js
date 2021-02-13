import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { graphql } from 'babel-plugin-relay/macro'
import { useHistory } from 'react-router-dom'

import mutate from '../utils/mutate'

const mutation = graphql`
    mutation SubmitAnswerFormMutation($input: AnswerCreateInput!){
        answerCreate(input: $input){
            answer{
                id
                answer
            }
        }
    }`

export default function SubmitAnswerForm(props) {
    const history = useHistory();

    const { setVisual, questionID } = props;
    const [answer, setAnswer] = useState("True");
    const [articleLink, setArticleLink] = useState("");
    const [statement, setStatement] = useState("");

    const handleSubmit = () => {
        const variables = {
            "input": {
                "answer": answer,
                "text": statement,
                "citationUrl": articleLink,
                "citationTitle": "Hello world ctitle2",
                "questionId": questionID
            }
        }
        mutate(mutation, variables)
            .then(() => { history.push('/login') })
            .catch(err => console.log(err[0].message))
    }

    return <MainWrapper>
        <>
            <Title>Answer the Question</Title>
        </>
        <CustomForm id="answerForm" onSubmit={handleSubmit}>
            <Group>
                <TDIV>
                    <div>
                        <Input
                            defaultChecked
                            inline
                            type="radio"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                            onClick={() => setAnswer("True")}
                        />
                    </div>
                    <div>
                        <label>True</label>
                    </div>
                </TDIV>
                <TDIV>
                    <div>
                        <Input
                            inline
                            type="radio"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                            onClick={() => setAnswer("False")}
                        />
                    </div>
                    <div>
                        <label>False</label>
                    </div>
                </TDIV>
                <TDIV>
                    <div>
                        <Input
                            inline
                            type="radio"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                            onClick={() => setAnswer("Uncertain")}
                        />
                    </div>
                    <div>
                        <label>Uncertain</label>
                    </div>
                </TDIV>
            </Group>

            <FormWrapper>
                <FormLabel>Explain your answer</FormLabel>
                <FormInput height={'height: 12.8rem;'} onChange={(e) => setStatement(e.target.value)} as="textarea" placeholder="For example x, y and z" required />
            </FormWrapper>
            <FormWrapper>
                <FormLabel>Citation (News URL)</FormLabel>
                <FormInput height={'height: 5rem;'} onChange={(e) => setArticleLink(e.target.value)} type="text" placeholder="https://example.com/article" required />
            </FormWrapper>
            <ButtonWrapper>
                <Button background={'background: none;'} type="button" onClick={() => setVisual(false)}>
                    Cancel
                </Button>
                <Button background={'background: #FFB800;'} type="submit" form="answerForm">
                    Submit Answer
                </Button>
            </ButtonWrapper>
        </CustomForm>
    </MainWrapper>
}

const TDIV = styled.div`
    display: flex;
    align-items: center;
`

const Group = styled(Form.Group)`
    display: flex;
    gap: 2rem;
`

const Input = styled(Form.Check)`
    height: 24px;
    margin: 0 0.7rem 0 0;
    padding: 0;
    input[type='radio'] {
        margin: 0;
        width: 2.8rem;
        height: 2.8rem;
    }
    input[type='radio']:checked {
        background-color: #FFB800;
        height: 2.8rem;
    }
`

const MainWrapper = styled.div`
    display: grid;
    width: 55rem;
    row-gap: 3rem;
    padding: 5rem;
    background: #EEF0F2;
    border-radius: 2rem;
`

const CustomForm = styled(Form)`
    display: grid;
    row-gap: 3rem;
`

const Title = styled.h1`
    font-family: SF Pro Display;
    font-style: normal;
    font-weight: bold;
    font-size: 3.2rem;
    line-height: 3.8rem;
`

const ButtonWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2,auto);
    gap: 1rem;
    justify-content: end;
`

const Button = styled.button`
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

    ${({ background }) => background}
`

const FormWrapper = styled.div`
  display: grid;
`

const FormLabel = styled.h1`
  font-weight: 600;
  font-size: 1.6rem;
  font-family: Open Sans;
`

const FormInput = styled.input`
  font-family: Open Sans;
  border-radius: 1rem;
  border: 1px solid #E5E5E5;
  padding: 1.8rem 1.4rem;
  ${({ height }) => height}
`