import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 50%;
  margin: 45px auto;
  background: #EEF0F2;
  border-radius: 20px;
  padding: 50px;
  font-weight: 600;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  height: 450px;

  @media only screen and (max-width: 1199px){
    width: 75%;
  }

  @media only screen and (max-width: 767px){
    width: 96%;
  }
`
