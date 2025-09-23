import React from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { survey } from "../components/SurveyQuestions";

const List = ({ questionIndex, onAnswer, selectedAnswer, loading }) => {
  const currentQuestion = survey[questionIndex];
  if (!currentQuestion) return null;

  return (
    <Container>
      {currentQuestion.options.map((option, idx) => (
        <ListItem
          key={idx}
          content={option}
          isSelected={selectedAnswer === idx + 1} // 서버 answer는 1부터 시작
          onClick={() => !loading && onAnswer(idx + 1)}
        />
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
