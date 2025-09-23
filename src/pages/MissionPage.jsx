import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import MissionCompleteModal from "../features/Mission/components/MissionCompleteModal";
import LevelUpModal from "../features/Mission/components/LevelUpModal";

import MissionHeader from "../features/Mission/components/MissionHeader";
import TodayMission from "../features/Mission/components/TodayMission";
import ProofMission from "../features/Mission/components/ProofMission";
import AlreadyWrittenMission from "../features/Mission/components/AlreadyWrittenMission";

const MissionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId; // navigate로 전달된 userId
  const user_id = userId;

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("공개 여부");
  const [missionData, setMissionData] = useState({
    content: "",
    missionComment: "",
  });
  const [alreadyVerified, setAlreadyVerified] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const [showLevelUp, setShowLevelUp] = useState(false); // 레벨업 모달
  const [levelUpInfo, setLevelUpInfo] = useState({ level: null, name: "" });
  const [userName, setUserName] = useState("");

  const LEVEL_NAME = ["한뭉치", "두뭉치", "세뭉치", "네뭉치", "다섯뭉치"];

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const isFormValid = imagePreview && finalText && selected !== "공개 여부";

  const getYMDInKST = (date = new Date()) => {
    const fmt = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return fmt.format(date);
  };

  useEffect(() => {
    if (!user_id) return; // userId 없으면 요청 안함
    const fetchMissionData = async () => {
      try {
        const formattedDate = getYMDInKST();
        const response = await axios.get(
          `${BASE_URL}/api/users/${user_id}/missions?date=${encodeURIComponent(
            formattedDate
          )}`
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
  }, [BASE_URL, refreshTrigger, user_id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/users/${user_id}`);
        setUserName(res.data.nickname); // ✅ 실제 응답 필드명
      } catch (e) {
        console.error(e);
      }
    };
    fetchUser();
  }, []);

  const handleRefreshMission = async () => {
    if (!user_id) return;
    try {
      setIsRefreshing(true);
      const res = await axios.put(
        `${BASE_URL}/api/users/${user_id}/missions/refresh`
      );
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
    if (!user_id) return;

    try {
      const formData = new FormData();
      formData.append("content", finalText);
      formData.append("public", selected === "공개" ? "true" : "false");
      formData.append("file", imageFile);

      const date = getYMDInKST();
      const missionIdResponse = await axios.get(
        `${BASE_URL}/api/users/${user_id}/missions?date=${encodeURIComponent(
          date
        )}`
      );
      const missionId = missionIdResponse.data.missionId;
      const postUrl = `${BASE_URL}/api/users/${user_id}/missions/${missionId}`;

      const { data } = await axios.post(postUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ 응답의 level로 레벨업 모달 여부 결정
      const nextLevel = Number(data?.level);
      if (nextLevel >= 2 && nextLevel <= 5) {
        setLevelUpInfo({
          level: nextLevel,
          name: LEVEL_NAME[nextLevel - 1], // 1~5 → idx 0~4
        });
        setShowLevelUp(true); // 레벨업 모달 먼저
      } else {
        setShowComplete(true); // 레벨 변화 없으면 바로 완료 모달
      }
      setTimeout(() => setRefreshTrigger((prev) => !prev), 300);
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
          userId={userId}
        />
        {alreadyVerified ? (
          <AlreadyWrittenMission userId={user_id} />
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

      {/* ✅ 레벨업 모달 (가장 위에) */}
      {showLevelUp && (
        <LevelUpModal
          levelName={levelUpInfo.name}
          userName={userName}
          onClose={() => {
            setShowLevelUp(false);
            setShowComplete(true); // 닫으면 완료 모달 보이기
          }}
          // characterImg={...} // 있으면 전달
        />
      )}

      {showComplete && (
        <MissionCompleteModal
          onClose={() => setShowComplete(false)}
          onGoBoard={() => {
            setShowComplete(false);
            navigate("/community", { state: { userId: user_id } });
          }}
          onGoShop={() => {
            setShowComplete(false);
            navigate("/shop", { state: { userId: user_id } });
          }}
        />
      )}
    </Container>
  );
};

export default MissionPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
