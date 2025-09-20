import React from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { survey } from "../components/SurveyQuestions"; 

const List = ({ questionIndex }) => {
  const currentQuestion = survey[questionIndex]; 
  if (!currentQuestion) return null; 

  return (
    <Container>
      {currentQuestion.options.map((option, idx) => (
        <ListItem key={idx} content={option} />
      ))}
    </Container>
  );
};

export default List;

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
`;