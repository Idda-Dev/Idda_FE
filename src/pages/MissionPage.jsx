// MissionPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import PurpleMissonIcon from "../assets/PurpleMissionIcon.png";

import MissionHeader from "../features/Mission/components/MissionHeader";
import TodayMission from "../features/Mission/components/TodayMission";
import ProofMission from "../features/Mission/components/ProofMission";
import AlreadyWrittenMission from "../features/Mission/components/AlreadyWrittenMission";
import TabBar from "../components/TabBar";

const MissionPage = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("공개 여부");
  const [missionData, setMissionData] = useState({ content: "", missionComment: "" });
  const [alreadyVerified, setAlreadyVerified] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const user_id = 1;
  const isFormValid = imagePreview && finalText && selected !== "공개 여부";

  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const now = new Date();
        const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
        const formattedDate = kstDate.toISOString().split("T")[0];

        const response = await axios.get(
          `${BASE_URL}/api/users/${user_id}/missions?date=${encodeURIComponent(formattedDate)}`
        );

        setMissionData({
          content: response.data.content,
          missionComment: response.data.missionComment,
        });
        setAlreadyVerified(response.data.verified);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMissionData();
  }, [BASE_URL, refreshTrigger]);

  const handleRefreshMission = async () => {
    try {
      setIsRefreshing(true);
      const res = await axios.put(`${BASE_URL}/api/users/${user_id}/missions/refresh`);
      setMissionData({
        content: res.data.content,
        missionComment: res.data.missionComment,
      });
      setAlreadyVerified(false);
      setInputText("");
      setFinalText("");
      setImagePreview(null);
      setImageFile(null);
      setSelected("공개 여부");
    } catch (e) {
      console.error(e);
      alert("새 미션 불러오기 실패");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleModalSubmit = () => {
    setFinalText(inputText);
    setShowModal(false);
  };

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!imageFile || !finalText || selected === "공개 여부") {
      alert("모든 입력을 완료해주세요.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("content", finalText);
      formData.append("public", selected === "공개" ? "true" : "false");
      formData.append("file", imageFile);

      const date = new Date().toISOString().split("T")[0];
      const missionIdResponse = await axios.get(
        `${BASE_URL}/api/users/${user_id}/missions?date=${encodeURIComponent(date)}`
      );
      const missionId = missionIdResponse.data.missionId;
      const postUrl = `${BASE_URL}/api/users/${user_id}/missions/${missionId}`;

      await axios.post(postUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("등록 완료!");
      setInputText("");
      setFinalText("");
      setImagePreview(null);
      setImageFile(null);
      setSelected("공개 여부");
      setAlreadyVerified(true);
      setRefreshTrigger(prev => !prev);
    } catch (error) {
      console.error(error);
      alert("등록 실패");
    }
  };

  return (
    <Container>
      <MissionHeader title="이불 밖은 따뜻해" />
      <MainContainer>
        <TodayMission
          content={missionData.content}
          missionComment={missionData.missionComment}
          onRefresh={handleRefreshMission}
          isRefreshing={isRefreshing}
          alreadyVerified={alreadyVerified}
        />
        {alreadyVerified ? (
          <AlreadyWrittenMission />
        ) : (
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
        )}
      </MainContainer>

      {/* 탭바 고정 */}
      <TabBarWrapper>
        <TabBar icons={{ mission: PurpleMissonIcon }} />
      </TabBarWrapper>
    </Container>
  );
};

export default MissionPage;

/* 스타일 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: relative;
  background-color: #f8faff;
`;

const MainContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 3rem;
  box-sizing: border-box;
`;

const TabBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px; /* 탭바 높이 */
  z-index: 100;
`;
