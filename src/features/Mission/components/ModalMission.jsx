import React from "react";
import styled from "styled-components";
import { Row } from "../../../components/CommonComponents";
import CancleIcon from "../../../assets/CancleIcon.png";

const ModalMission = ({
  missionContent,
  inputText,
  setInputText,
  onClose,
  onSubmit,
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <Row
          style={{
            justifyContent: "space-between",
            alignItems: "start",
            marginBottom: "15px",
          }}
        >
          <div style={{ width: "25px" }} />
          <ModalTitle>{missionContent}</ModalTitle>
          <img
            src={CancleIcon}
            alt="back"
            onClick={onClose}
            style={{ cursor: "pointer", width: "7%" }}
          />
        </Row>
        <hr
          style={{
            height: "1px",
            backgroundColor: "#000",
            border: "none",
          }}
        />
        <ModalTextarea
          placeholder="미션을 하며 느꼈던 감정을 기록해보세요!"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </ModalContent>
      <SubmitButton onClick={onSubmit}>등록하기</SubmitButton>
    </ModalOverlay>
  );
};

export default ModalMission;

// 스타일 그대로 유지
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
`;

const ModalContent = styled.div`
  background: #d1cdff;
  padding: 24px;
  border-radius: 16px;
  width: 90%;
  max-width: 320px;
`;

const ModalTitle = styled.div`
  text-align: left;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.3px;
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  border-radius: 8px;
  border: none;
  padding: 12px 0px;
  font-size: 12px;
  outline: none;
  background: #d1cdff;
  color: black;
`;

const SubmitButton = styled.div`
  width: 100px;
  background-color: ${(props) => (props.disabled ? "#D1CDFF" : "#b1aaff")};
  border-radius: 16px;
  color: black;
  font-size: 14px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  padding: 4px;
  border: none;
  transition: 0.2s;
`;
