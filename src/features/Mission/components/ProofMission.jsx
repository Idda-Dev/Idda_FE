import React from "react";
import styled from "styled-components";
import Star1 from "../assets/Star1.png";
import WritingIcon from "../assets/WritingIcon.png";
import ExampleImg from "../assets/ExampleImg.png";
import { Row } from "../../../components/CommonComponents";
import ModalMission from "./ModalMission";

const ProofMission = ({ data, handlers }) => {
  const {
    imagePreview,
    inputText,
    finalText,
    selected,
    isOpen,
    showModal,
    missionContent,
    isFormValid,
  } = data;

  const {
    handleChangeImage,
    handleModalSubmit,
    handleSelect,
    handleSubmit,
    setShowModal,
    setInputText,
    setIsOpen,
  } = handlers;

  return (
    <div>
      <LightPurpleWrapper>
        <TitleBox>
          <img src={Star1} alt="Star" style={{ width: "20%" }} />
          미션 인증
        </TitleBox>
        <WhiteWrapper>
          <Label htmlFor="imageUpload">
            {imagePreview ? (
              <PreviewImage src={imagePreview} alt="업로드된 이미지" />
            ) : (
              <Placeholder>
                <img
                  src={ExampleImg}
                  alt="예시이미지"
                  style={{ width: "100%" }}
                />
              </Placeholder>
            )}
          </Label>
          <HiddenInput
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
          />
          <Caption onClick={() => setShowModal(true)}>
            <Row style={{ gap: "4px" }}>
              {finalText || "미션을 하며 스친 생각이나 기분을 기록해주세요."}
              <img src={WritingIcon} style={{ width: "6%" }} />
            </Row>
          </Caption>
          {showModal && (
            <ModalMission
              missionContent={missionContent}
              inputText={inputText}
              setInputText={setInputText}
              onClose={() => setShowModal(false)}
              onSubmit={handleModalSubmit}
            />
          )}
          <DropdownRight>
            <DropdownContainer>
              <SelectedBox onClick={() => setIsOpen((prev) => !prev)}>
                {selected}
                <Arrow $isOpen={isOpen}>▾</Arrow>
              </SelectedBox>
              {isOpen && (
                <Options>
                  <Option onClick={() => handleSelect("비공개")}>비공개</Option>
                  <Option onClick={() => handleSelect("공개")}>공개</Option>
                </Options>
              )}
            </DropdownContainer>
          </DropdownRight>
        </WhiteWrapper>
        <SubmitButton disabled={!isFormValid} onClick={handleSubmit}>
          등록하기
        </SubmitButton>
      </LightPurpleWrapper>
    </div>
  );
};

export default ProofMission;

const TitleBox = styled.div`
  border-radius: 36px;
  background: #fff;
  box-shadow: -10px 0 20px 0 rgba(0, 0, 0, 0.06);
  width: 7.5rem;
  height: 30px;
  padding: 5px 15px 5px 5px;
  justify-content: center;
  align-items: center;

  display: flex;
  gap: 6px;
  flex-shrink: 0;
  font-weight: bold;
  font-size: 13px;
`;

const LightPurpleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.94rem;
  padding: 1.3rem;
  width: 100%;
  flex-shrink: 0;
  border-radius: 16px;
  background-color: #eceaff;
`;

const WhiteWrapper = styled.div`
  width: 16rem;
  flex-shrink: 0;
  border-radius: 1rem;
  background: #fff;
  box-shadow: 6px 0 20px 0 rgba(0, 0, 0, 0.02);
  padding: 1.3rem 1.3rem 1rem 1.3rem;
`;

const Label = styled.label`
  display: block;
  width: 100%;
  height: 10rem;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ccc;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 2. 글쓰기 관련
const Caption = styled.div`
  width: 100%;
  font-size: 0.69rem;
  color: #444;
  letter-spacing: -0.5px;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: 50%; /* 6px */
  text-underline-position: from-font;
  margin-top: 10px;
  margin-bottom: 15px;
  cursor: pointer;
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

// 3. 공개여부

const DropdownRight = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽으로 붙이기 */
  width: 100%;
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 70px;
  font-size: 9px;
`;

const SelectedBox = styled.div`
  background-color: #f2f2f2;
  border-radius: 20px;
  padding: 3px 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #7f7f7f;
`;

const Arrow = styled.span`
  font-size: 12px;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "none")};
  transition: 0.2s;
  color: #666;
`;

const Options = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 10;
  list-style: none;
  padding: 0px;
`;

const Option = styled.li`
  list-style: none;
  &::marker {
    content: "";
  }
  padding: 10px 12px;
  cursor: pointer;
  color: #7f7f7f;
  background-color: #f2f2f2;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
