import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

import MissionCompleteModal from "../features/Mission/components/MissionCompleteModal";
import LevelUpModal from "../features/Mission/components/LevelUpModal";
import MissionHeader from "../features/Mission/components/MissionHeader";
import TodayMission from "../features/Mission/components/TodayMission";
import ProofMission from "../features/Mission/components/ProofMission";
import AlreadyWrittenMission from "../features/Mission/components/AlreadyWrittenMission";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MissionPage = () => {
  const navigate = useNavigate();
  const userId = useUserStore((s) => s.userId);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("공개 여부");

  // ✅ 난이도(difficulty)까지 포함해서 보관
  const [missionData, setMissionData] = useState({
    content: "",
    missionComment: "",
    difficulty: "", // "EASY" | "NORMAL" | "HARD"
  });

  const [alreadyVerified, setAlreadyVerified] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const [showComplete, setShowComplete] = useState(false);
  const [earnedCandy, setEarnedCandy] = useState(0); // ✅ 완료 모달에 표시할 개수

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpInfo, setLevelUpInfo] = useState({ level: null, name: "" });
  const [userName, setUserName] = useState("");

  const LEVEL_NAME = ["한뭉치", "두뭉치", "세뭉치", "네뭉치", "솜뭉치"];
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

  // ✅ 난이도→Candy 매핑 함수
  const getCandyByDifficulty = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return 4;
      case "NORMAL":
        return 6;
      case "HARD":
        return 8;
      default:
        return 0;
    }
  };

  // 미션 데이터
  useEffect(() => {
    if (!userId) return;
    const fetchMissionData = async () => {
      try {
        const formattedDate = getYMDInKST();
        const response = await axios.get(
          `${BASE_URL}/api/users/${userId}/missions?date=${encodeURIComponent(
            formattedDate
          )}`
        );
        setMissionData({
          content: response.data.content,
          missionComment: response.data.missionComment,
          difficulty: response.data.difficulty, // ✅ 추가
        });
        setAlreadyVerified(response.data.verified);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMissionData();
  }, [BASE_URL, refreshTrigger, userId]);

  // 유저 닉네임
  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/users/${userId}`);
        setUserName(res.data.nickname);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUser();
  }, [userId]);

  const handleRefreshMission = async () => {
    if (!userId) return;
    try {
      setIsRefreshing(true);
      const res = await axios.put(
        `${BASE_URL}/api/users/${userId}/missions/refresh`
      );
      // ✅ refresh 응답에서도 난이도 포함
      setMissionData({
        content: res.data.content,
        missionComment: res.data.missionComment,
        difficulty: res.data.difficulty,
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
    if (!userId) return;

    try {
      const formData = new FormData();
      formData.append("content", finalText);
      formData.append("public", selected === "공개" ? "true" : "false");
      formData.append("file", imageFile);

      const date = getYMDInKST();
      const missionIdResponse = await axios.get(
        `${BASE_URL}/api/users/${userId}/missions?date=${encodeURIComponent(
          date
        )}`
      );
      const missionId = missionIdResponse.data.missionId;
      const postUrl = `${BASE_URL}/api/users/${userId}/missions/${missionId}`;

      const { data } = await axios.post(postUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAlreadyVerified(true);

      // ✅ 이번에 획득한 Candy는 현재 미션의 난이도로 계산
      const earned = getCandyByDifficulty(missionData.difficulty);
      setEarnedCandy(earned);

      // ✅ levelUp 여부로 모달 분기
      const levelUp = Boolean(data?.levelUp);
      if (levelUp) {
        const nextLevel = Number(data?.level);
        if (nextLevel >= 1 && nextLevel <= 5) {
          setLevelUpInfo({ level: nextLevel, name: LEVEL_NAME[nextLevel - 1] });
        } else {
          setLevelUpInfo({ level: null, name: "" });
        }
        setShowLevelUp(true); // ✅ levelUp이면 레벨업 모달
      } else {
        setShowComplete(true); // ✅ 아니면 완료 모달
      }

      // (선택) 데이터 리프레시
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
          difficulty={missionData.difficulty} // ✅ 넘겨줌
          onRefresh={handleRefreshMission}
          isRefreshing={isRefreshing}
          alreadyVerified={alreadyVerified}
          userId={userId}
        />
        {alreadyVerified ? (
          <AlreadyWrittenMission userId={userId} />
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
        <div style={{ height: "50px" }} />
      </MainContainer>

      {showLevelUp && (
        <LevelUpModal
          levelName={levelUpInfo.name}
          userName={userName}
          onClose={() => {
            setShowLevelUp(false);
            // 레벨업 후에는 완료 모달은 띄우지 않고 그냥 페이지 유지하고 싶으면 아래 줄 주석 처리
            setShowComplete(true); // ← 레벨업 후에도 “오늘도 수고했어요” 모달 보여주려면 유지
          }}
        />
      )}

      {showComplete && (
        <MissionCompleteModal
          candyCount={earnedCandy} // ✅ 난이도에 따른 개수 전달
          onClose={() => setShowComplete(false)}
          onGoBoard={() => {
            setShowComplete(false);
            navigate("/community");
          }}
          onGoShop={() => {
            setShowComplete(false);
            navigate("/shop");
          }}
        />
      )}
    </Container>
  );
};

export default MissionPage;

/* ================= styled ================= */
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
