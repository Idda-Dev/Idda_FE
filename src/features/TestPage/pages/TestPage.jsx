import React from 'react'
import styled from 'styled-components'
import Title from '../components/Title'
import FirstPageTitle from '../components/FirstPageTitle'
import List from '../components/List'
import Content from '../components/Content'
import LastPageContent from "../components/LastPageContent"

const TestPage = () => {
  return (
    <Container>
        <Wrapper>
            <FirstPageTitle questionIndex={0}/>
            <List questionIndex={0}/>
        </Wrapper>
        <Content/>
    </Container>
  )
}

export default TestPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;  
  width: 100%;
  padding-top: 9rem;
  padding-bottom: 5rem;
  background-color: #ECEAFF;
`
const Wrapper=styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`
