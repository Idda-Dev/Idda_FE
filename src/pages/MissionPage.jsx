import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

import PurpleMissonIcon from "../assets/PurpleMissionIcon.png";

import MissionHeader from "../features/Mission/components/MissionHeader";
import TodayMission from "../features/Mission/components/TodayMission";
import ProofMission from "../features/Mission/components/ProofMission";
import TabBar from "../components/TabBar";

TabBar;
const MissionPage = () => {
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

  // 2. 미션 인증 글 작성
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

      // 화면 다시 불러오기 트리거
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.error("미션 인증 등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#F8FAFF" }}>
      <Container>
        <MissionHeader title={"90일의 솜뭉치"} />
        <MainContainer>
          <TodayMission
            content={missionData.content}
            missionComment={missionData.missionComment}
          />
          <ProofMission
            data={{
              imagePreview,
              inputText,
              finalText,
              selected,
              isOpen,
              showModal,
              missionContent: missionData?.content,
              isFormValid,
            }}
            handlers={{
              handleChangeImage,
              handleModalSubmit,
              handleSelect,
              handleSubmit,
              setShowModal,
              setInputText,
              setIsOpen,
            }}
          />
        </MainContainer>
        <TabBar icons={{ mission: PurpleMissonIcon }} />
      </Container>
    </div>
  );
};

export default MissionPage;

const MainContainer = styled.div`
  padding: 1.5rem 3rem;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;
