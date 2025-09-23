// Content.jsx
import React from "react";
import styled from "styled-components";
import BackBt from "../assets/BackBt.png";
import GoBt from "../assets/GoBt.png";

const Content = ({ onPrev, onNext, questionNumber, selectedAnswer }) => {
  const isClickable = selectedAnswer != null;

  return (
    <Wrapper>
      {questionNumber > 1 && (
        <BackIcon src={BackBt} alt="back-button" onClick={onPrev} />
      )}
      <Text>해당 사항에 체크해 주세요.</Text>
      <GoIcon
        src={GoBt}
        alt="go-button"
        onClick={isClickable ? onNext : undefined}
        $clickable={isClickable}
        aria-disabled={!isClickable}
        tabIndex={isClickable ? 0 : -1}
      />
    </Wrapper>
  );
};

export default Content;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 5.84rem;
  justify-content: flex-end;
`;

const BackIcon = styled.img`
  height: 30%;
  width: auto;
  cursor: pointer;
`;

const GoIcon = styled.img`
  height: 30%;
  width: auto;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  opacity: ${({ $clickable }) => ($clickable ? 1 : 0.5)};
  pointer-events: ${({ $clickable }) => ($clickable ? "auto" : "none")};
`;

const Text = styled.p`
  margin: 0 1rem 0 1rem;
  font-size: 0.9rem;
  text-align: center;
  white-space: nowrap;
`;
