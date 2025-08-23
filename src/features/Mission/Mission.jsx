import React from "react";
import styled from "styled-components";
import Star1 from "./assets/Star1.png";
import CalendarIcon from "./assets/CalendarIcon.png";
import MissionCard from "./assets/MissionCard.png";
import { Row } from "../../components/CommonComponents";
import { useState, useEffect } from "react";
import WritingIcon from "./assets/WritingIcon.png";
import ReMissionIcon from "./assets/ReMissionIcon.png";
import MissionHeader from "./MissionHeader.jsx";
import TabBar from "../../components/TabBar.jsx";
import PurpleMissonIcon from "../../assets/PurpleMissionIcon.png";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/BackIcon.png";
import ExampleImg from "./assets/ExampleImg.png";
import axios from "axios";

const Mission = () => {
  // 0. 달력이동
  const nav = useNavigate();

  const handleMissionCalendarPage = () => {
    nav("/mission/calendar");
  };

  // 1. 사진첨부
  const [imagePreview, setImagePreview] = useState(null);

  // 2. 글쓰기 및 모달
  const [showModal, setShowModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [finalText, setFinalText] = useState(""); // 작성 완료된 글

  const handleModalSubmit = () => {
    setFinalText(inputText);
    setShowModal(false);
  };

  // 3. 게시글 공개여부(드롭다운)
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("공개 여부");

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
  };

  // 4. 등록하기 버튼 활성화
  const isFormValid = imagePreview && finalText && selected !== "공개 여부";

  // API
  const BASE_URL = import.meta.env.VITE_BASE_URL; // VITE_BASE_URL 불러오기
  const user_id = 1; // user_id 1로 고정
  const [refreshTrigger, setRefreshTrigger] = useState(false); // 글 등록 후 화면 초기화

  // 1. 미션 정보
  const [missionData, setMissionData] = useState({
    content: "",
    missionComment: "",
  });

  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const date = new Date(); // 현재 날짜
        const formattedDate = date.toISOString().split("T")[0];
        const response = await axios.get(
          `${BASE_URL}/api/users/${user_id}/missions?date=${encodeURIComponent(
            formattedDate
          )}`
        );
        setMissionData({
          content: response.data.content,
          missionComment: response.data.missionComment,
        });
      } catch (error) {
        console.error("미션 데이터를 불러오는데 실패했습니다.", error);
      }
    };

    fetchMissionData();
  }, [BASE_URL, refreshTrigger]);

  // 2. 인증 글 작성하기

  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태 추가

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file); // File 객체 저장

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // 미리보기용
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      if (!imageFile || !finalText || selected === "공개 여부") {
        alert("모든 입력을 완료해주세요.");
        return;
      }

      const formData = new FormData();
      formData.append("content", finalText);
      formData.append("public", selected === "공개" ? "true" : "false");
      formData.append("file", imageFile);

      const date = new Date().toISOString().split("T")[0];

      // 먼저 오늘 날짜에 해당하는 missionId 가져오기
      const missionIdResponse = await axios.get(
        `${BASE_URL}/api/users/${user_id}/missions?date=${encodeURIComponent(
          date
        )}`
      );
      const missionId = missionIdResponse.data.missionId;

      const postUrl = `${BASE_URL}/api/users/${user_id}/missions/${missionId}`;

      await axios.post(postUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("미션 인증이 성공적으로 등록되었습니다!");
      // 상태 초기화
      setInputText("");
      setFinalText("");
      setImagePreview(null);
      setImageFile(null);
      setSelected("공개 여부");

      // 🔥 화면 다시 불러오기 트리거
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.error("미션 인증 등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Container>
        <MissionHeader title={"90일의 솜뭉치"} />
        <MainContainer>
          <Row
            style={{ justifyContent: "space-between", marginBottom: "20px" }}
          >
            <TitleBox>
              <img src={Star1} alt="Star" style={{ width: "20%" }} />
              오늘의 미션
            </TitleBox>
            <img
              src={CalendarIcon}
              alt="CalendarIcon"
              style={{ width: "12%", cursor: "pointer" }}
              onClick={handleMissionCalendarPage}
            />
          </Row>
          <ImageWrapper>
            <BackgroundImage src={MissionCard} alt="카드" />
            <img
              src={ReMissionIcon}
              style={{
                position: "absolute",
                top: "12%",
                left: "88%",
                width: "6%",
                cursor: "pointer",
              }}
            />
            <TextOverlayBold>{missionData.content}</TextOverlayBold>
            <TextOverlayRegular>
              {missionData.missionComment}
            </TextOverlayRegular>
            <CandyOverlay>5개</CandyOverlay>
          </ImageWrapper>
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
              <Caption>
                <Row style={{ gap: "4px" }}>
                  {finalText ||
                    "미션을 하며 스친 생각이나 기분을 기록해주세요."}
                  <img
                    src={WritingIcon}
                    style={{ cursor: "pointer", width: "6%" }}
                    onClick={() => setShowModal(true)}
                  />
                </Row>
              </Caption>
              {showModal && (
                <ModalOverlay>
                  <ModalContent>
                    <Row
                      style={{
                        justifyContent: "space-between",
                        alignItems: "start",
                      }}
                    >
                      <ModalTitle>{missionData.content}</ModalTitle>
                      <img
                        src={BackIcon}
                        alt="back"
                        onClick={() => setShowModal(false)}
                        style={{ cursor: "pointer", width: "9%" }}
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
                  <SubmitButton onClick={handleModalSubmit}>
                    등록하기
                  </SubmitButton>
                </ModalOverlay>
              )}
              <DropdownRight>
                <DropdownContainer>
                  <SelectedBox onClick={() => setIsOpen((prev) => !prev)}>
                    {selected}
                    <Arrow $isOpen={isOpen}>▾</Arrow>
                  </SelectedBox>
                  {isOpen && (
                    <Options>
                      <Option onClick={() => handleSelect("비공개")}>
                        비공개
                      </Option>
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
        </MainContainer>
        <TabBar icons={{ mission: PurpleMissonIcon }} />
      </Container>
    </>
  );
};

export default Mission;

const MainContainer = styled.div`
  padding: 1.5rem 3rem;
`;

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

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const BackgroundImage = styled.img`
  display: block;
  width: 106%;
  height: auto;
`;

// 카드 위 오버레이 관련
const TextOverlayBold = styled.p`
  width: 100%;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%); /* 정확히 중앙으로 이동 */
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

const TextOverlayRegular = styled.p`
  width: 100%;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%); /* 정확히 중앙으로 이동 */
  color: #c4c4c4;
  font-size: 10px;
  font-weight: 400;
  white-space: pre-line;
`;

const CandyOverlay = styled.div`
  width: 88px;
  height: 30px;
  position: absolute;
  top: 75%;
  left: 78%;
  font-size: 10px;
  font-weight: 400;
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
  padding: 2rem 1.3rem 1rem 1.3rem;
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
  font-size: 9.5px;
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
  margin-bottom: 20px;
`;

// 모달 관련 스타일
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
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 100% */
  letter-spacing: 0.3px;
  margin-bottom: 14px;
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
  width: 80px;
  font-size: 9px;
`;

const SelectedBox = styled.div`
  background-color: #f2f2f2;
  border-radius: 20px;
  padding: 5px 12px;
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

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;
