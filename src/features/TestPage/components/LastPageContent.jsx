import React from "react";
import styled from "styled-components";
import QuestionIcon from "../assets/QuestionIcon.png";

const LastPageContent = ({ onSubmit, disabled }) => {
  return (
    <Wrapper>
      <Icon src={QuestionIcon} alt="question-icon" />
      <Button onClick={onSubmit} disabled={disabled}>
        은둔 유형 확인하기
      </Button>
    </Wrapper>
  );
};

export default LastPageContent;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.img`
  width: 5rem;
  height: auto;
`;

const Button = styled.button`
  background-color: ${({ disabled }) => (disabled ? "#2f0047" : "#2f0047")};
  color: #fff;
  border: none;
  border-radius: 36px;
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  outline: none;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:active {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(0.95)")};
  }
`;
