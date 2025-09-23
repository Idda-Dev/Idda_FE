import React from "react";
import styled from "styled-components";
import BackBt from "../assets/BackBt.png";
import GoBt from "../assets/GoBt.png";

const Content = ({ onPrev, onNext, questionNumber, selectedAnswer }) => {
  const isClickable = selectedAnswer != null;

  return (
    <Wrapper>
      {questionNumber > 1 && (
        <Icon src={BackBt} alt="back-button" onClick={onPrev} />
      )}
      <Text>해당 사항에 체크해 주세요.</Text>
      <Icon
        src={GoBt}
        alt="go-button"
        // 클릭 불가능하면 onClick 자체를 없앰
        onClick={isClickable ? onNext : undefined}
        $clickable={isClickable} // ✅ transient prop로 변경
        aria-disabled={!isClickable} // 접근성 보조
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

const Icon = styled.img`
  height: 30%;
  width: auto;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")}; /* ✅ */
  opacity: ${({ $clickable }) => ($clickable ? 1 : 0.5)};
  pointer-events: ${({ $clickable }) => ($clickable ? "auto" : "none")};
`;

const Text = styled.p`
  margin: 0 1rem 0 1rem;
  font-size: 0.9rem;
  text-align: center;
`;
