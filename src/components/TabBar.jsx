import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

// 기본/활성 아이콘
import HomeIcon from "../assets/HomeIcon.png";
import MissionIcon from "../assets/MissionIcon.png";
import ShopIcon from "../assets/ShopIcon.png";
import CommunityIcon from "../assets/CommunityIcon.png";

import PurpleHomeIcon from "../assets/PurpleHomeIcon.png";
import PurpleMissionIcon from "../assets/PurpleMissionIcon.png";
import PurpleShopIcon from "../assets/PurpleShopIcon.png";
import PurpleCommunityIcon from "../assets/PurpleCommunityIcon.png";

const TabBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 경로별 배경색 정의
  const backgroundColorMap = {
    "/": "rgba(255,255,255,0.9)", // 메인
    "/mission": "#E8F0FF", // 미션
    "/shop": "#fff", // 상점
    "/community": "#E8F0FF", // 커뮤니티
  };

  // 기본 배경 → 정확히 매칭 안되면 흰색
  const backgroundColor =
    backgroundColorMap[pathname] || "rgba(255,255,255,0.9)";

  const tabs = [
    {
      path: "/",
      label: "홈",
      icon: HomeIcon,
      activeIcon: PurpleHomeIcon,
      match: (p) => p === "/", // ← 홈은 정확히 일치할 때만 활성
    },
    {
      path: "/mission",
      label: "미션",
      icon: MissionIcon,
      activeIcon: PurpleMissionIcon,
      match: (p) => p.startsWith("/mission"),
    },
    {
      path: "/shop",
      label: "상점",
      icon: ShopIcon,
      activeIcon: PurpleShopIcon,
      match: (p) => p.startsWith("/shop"),
    },
    {
      path: "/community",
      label: "게시판",
      icon: CommunityIcon,
      activeIcon: PurpleCommunityIcon,
      match: (p) => p.startsWith("/community"),
    },
  ];

  return (
    <Wrapper $backgroundColor={backgroundColor}>
      {tabs.map((tab) => {
        const active = tab.match(pathname);
        return (
          <TabButton key={tab.path} onClick={() => navigate(tab.path)}>
            <TabIcon src={active ? tab.activeIcon : tab.icon} />
            <TabLabel $active={active}>{tab.label}</TabLabel>
          </TabButton>
        );
      })}
    </Wrapper>
  );
};

export default TabBar;

/* ===== styled ===== */
const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 390px; /* AppContainer 폭과 동일 */
  height: 60px;
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 999;

  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.06);

  /* iOS 홈바 안전영역 */
  padding-bottom: env(safe-area-inset-bottom);
`;

const TabButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  display: flex;
  width: 64px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;

  margin-bottom: 20px;

  &:focus {
    outline: none;
  }
`;

const TabIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const TabLabel = styled.span`
  font-size: 9px;
  line-height: 1;
  white-space: nowrap;
  color: ${({ $active }) => ($active ? "#6F69B0" : "#000")};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
`;
