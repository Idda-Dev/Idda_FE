import React from 'react';
import styled from 'styled-components';
import BackBt from "../assets/BackBt.png";
import GoBt from "../assets/GoBt.png";

const Content = ({ onPrev, onNext, questionNumber, selectedAnswer }) => {
  const goButtonClickable = selectedAnswer != null; // 체크 여부 확인

  return (
    <Wrapper>
      {questionNumber > 1 && (
        <Icon src={BackBt} alt="back-button" onClick={onPrev} />
      )}
      <Text>해당 사항에 체크해 주세요.</Text>
      <Icon
        src={GoBt}
        alt="go-button"
        onClick={goButtonClickable ? onNext : () => {}}
        clickable={goButtonClickable} // styled에서 cursor 제어
      />
    </Wrapper>
  );
};

export default Content;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding:0 5.84rem;
  justify-content: flex-end;
`;

const Icon = styled.img`
  height: 30%;
  width: auto;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
`;

const Text = styled.p`
  margin: 0 1rem 0 1rem;
  font-size: 0.9rem;
  text-align: center;
`;

