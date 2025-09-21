import React from 'react';
import styled from 'styled-components';
import BackBt from "../assets/BackBt.png";
import GoBt from "../assets/GoBt.png";

const Content = ({ onPrev, onNext, questionNumber }) => {
  return (
    <Wrapper>
      {/* 첫 질문이면 BackBt 숨기기 */}
      {questionNumber > 1 && (
        <Icon src={BackBt} alt="back-button" onClick={onPrev} />
      )}
      <Text>해당 사항에 체크해 주세요.</Text>
      <Icon src={GoBt} alt="go-button" onClick={onNext} />
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
  cursor: pointer;
`;

const Text = styled.p`
  margin: 0 1rem 0 1rem;
  font-size: 0.9rem;
  text-align: center;
`;
