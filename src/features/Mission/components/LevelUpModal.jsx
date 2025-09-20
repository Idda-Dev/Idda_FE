// features/Mission/components/LevelUpModal.jsx
import React from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Star2 from "../assets/Star2.svg";
import { Column } from "../../../components/CommonComponents";
import PressStart2P from "../../../../public/fonts/PressStart2P-Regular.ttf";

const FontStyle = createGlobalStyle`
  @font-face {
    font-family: 'PressStart2P';
    src: url(${PressStart2P}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

// 캐릭터 이미지가 있다면 prop으로 넘겨서 쓰세요.
const LevelUpModal = ({
  level,
  levelName,
  userName,
  onClose,
  characterImg,
}) => {
  // ✅ 레벨별 맞춤 멘트 정의
  const levelMentMap = {
    두뭉치: "두뭉치는 집안에서 할 수 있는 미션부터 시작해요.",
    세뭉치: "세뭉치는 작은 외출 미션부터 시작해요.",
    네뭉치: "네뭉치는 타인과 상호작용하는 미션부터 시작해요.",
    다섯뭉치: `이제 모든 뭉치의 미션을 받아볼 수 있어요.\n여기까지 오느라 정말 수고했어요. ${userName}님의 여정을 늘 응원해요!`,
  };

  // ✅ levelName에 해당하는 메시지 선택
  const desc2Text = levelMentMap[levelName] || "";
  return (
    <Overlay>
      <FontStyle /> {/* ✅ 폰트 적용 */}
      {/* 상단 Level Up 배지 */}
      <LevelBadge>Level Up</LevelBadge>
      <Column style={{ alignItems: "center", gap: "30px" }}>
        {/* 캐릭터 + 후광 */}
        <CharacterWrap>
          <Glow />
          {characterImg ? (
            <Character src={characterImg} alt="character" />
          ) : (
            <Fallback />
          )}
        </CharacterWrap>
        <MoongChi>{levelName}</MoongChi>
        {/* 하단 카드 */}
        <Card>
          <Star src={Star2} />
          <Title>{userName}님이 해냈어요!</Title>
          <Desc>이제 새로운 도전이 기다리고 있어요.</Desc>
          <Desc2>{desc2Text}</Desc2>
          <PrimaryBtn onClick={onClose}>한 걸음 더 나아가기</PrimaryBtn>
        </Card>
      </Column>
    </Overlay>
  );
};

export default LevelUpModal;

/* =================== styled =================== */
const Overlay = styled.div`
  position: absolute; /* 앱 화면만 덮도록 absolute */
  inset: 0;
  z-index: 1100; /* 완료 모달(1000)보다 위 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background: rgba(0, 0, 0, 0.45);
  padding-top: 100px;
`;

const LevelBadge = styled.div`
  border-radius: 26px;
  background: rgba(236, 234, 255, 0.5);
  display: inline-flex;
  padding: 16px 26px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  font-family: "PressStart2P", monospace; /* ✅ 새 폰트 적용 */
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 2px;

  color: var(--white, #fff);
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.16);
  font-size: 24px;
  font-weight: 400;
`;

const pulse = keyframes`
  0%   { transform: scale(1);   opacity: .7; }
  50%  { transform: scale(1.12);opacity: 1;  }
  100% { transform: scale(1);   opacity: .7; }
`;

const CharacterWrap = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
`;

const Glow = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(255, 230, 120, 0.9) 0%,
    rgba(255, 230, 120, 0.55) 35%,
    rgba(0, 0, 0, 0) 70%
  );
  filter: blur(8px);
  animation: ${pulse} 1.8s ease-in-out infinite;
`;

const Character = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Fallback = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #c9a8ff;
`;

const MoongChi = styled.div`
  width: 94px;
  padding: 8px 8px 16px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 26px;
  background: rgba(236, 234, 255, 0.6);

  color: var(--white, #fff);
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.16);
  font-family: "Press Start 2P";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Card = styled.div`
  width: 259px;
  height: 227px;
  flex-shrink: 0;
  background: #eceaff;
  border-radius: 24px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.16);
  padding: 22px 20px 26px;
  text-align: center;
`;

const Star = styled.img`
  width: 20px;
`;

const Title = styled.div`
  color: #2f0047;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const Desc = styled.div`
  color: #6f69b0;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 5px;
`;

const Desc2 = styled.div`
  margin: 0 0 30px;
  color: #2f0047;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const PrimaryBtn = styled.button`
  border: 0;
  width: 70%;
  height: 40px;
  border-radius: 36px;
  background: #6f69b0;
  color: #fff;
  cursor: pointer;

  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
