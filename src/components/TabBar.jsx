import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 기본아이콘
import HomeIcon from "../assets/HomeIcon.png";
import MissionIcon from "../assets/MissionIcon.png";
import ShopIcon from "../assets/ShopIcon.png";
import CommunityIcon from "../assets/CommunityIcon.png";

// 탭바 가져다 쓸때
// 페이지 컨테이너 설정 다음과 같이 하기 (absolute - relative 로 설정해둠)
// const Container = styled.div`
//   width: 100%;
//   margin: 0 auto;
//   position: relative;
//   min-height: 100%;
//   display: flex;
//   flex-direction: column;
// `

const TabBar = ({ icons = {}, backgroundColor = "#E8F0FF" }) => {
  const navigate = useNavigate(); // 페이지 이동 함수

  const finalIcons = {
    home: icons.home || HomeIcon,
    mission: icons.mission || MissionIcon,
    shop: icons.shop || ShopIcon,
    community: icons.community || CommunityIcon,
  };

  return (
    <Wrapper $backgroundColor={backgroundColor}>
      <TabButton onClick={() => navigate("/")}>
        <TabIcon src={finalIcons.home} alt="홈" />홈
      </TabButton>
      <TabButton onClick={() => navigate("/mission")}>
        <TabIcon src={finalIcons.mission} alt="미션" />
        미션
      </TabButton>
      <TabButton onClick={() => navigate("/shop")}>
        <TabIcon src={finalIcons.shop} alt="상점" />
        상점
      </TabButton>
      <TabButton onClick={() => navigate("/community")}>
        <TabIcon src={finalIcons.community} alt="게시판" />
        게시판
      </TabButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  padding: 1.5rem 3rem;
  bottom: 0;
  width: 100%;
  height: 2.5rem;

  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;

  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 16px 16px 0 0;
`;

const TabButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-size: 0.6rem;
  color: black;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const TabIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-bottom: 2px;
`;

export default TabBar;

// 페이지에서 아이콘, 배경색 변경

// import TapBar from "../components/TapBar";
// import PurpleHomeIcon from "../assets/PurpleHomeIcon.png";

// function MissonPage() {
//   return (
//     <div>
//       {/* 페이지 내용 */}
//       <TapBar
//          icons={{ home: PurpleHomeIcon }}
//          backgroundColor="#FFF0E0"
//        />
//     </div>
//   );
// }
