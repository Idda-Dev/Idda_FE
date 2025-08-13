import styled from "styled-components";

// 기본아이콘
import HomeIcon from "../assets/HomeIcon.png";
import MissionIcon from "../assets/MissionIcon.png";
import ShopIcon from "../assets/ShopIcon.png";
import CommunityIcon from "../assets/CommunityIcon.png";

const TabBar = ({ icons = {}, backgroundColor = "#E8F0FF" }) => {
  // 기본 아이콘과 전달받은 아이콘 합치기, 배경색 재설정
  const finalIcons = {
    home: icons.home || HomeIcon,
    mission: icons.mission || MissionIcon,
    shop: icons.shop || ShopIcon,
    community: icons.community || CommunityIcon,
  };

  return (
    <Wrapper backgroundColor={backgroundColor}>
      <TabButton>
        <TabIcon src={finalIcons.home} alt="홈" />
        홈
      </TabButton>
      <TabButton>
        <TabIcon src={finalIcons.mission} alt="미션" />
        미션
      </TabButton>
      <TabButton>
        <TabIcon src={finalIcons.shop} alt="상점" />
        상점
      </TabButton>
      <TabButton>
        <TabIcon src={finalIcons.community} alt="게시판" />
        게시판
      </TabButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  padding: 1.7rem 4rem;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;

  background-color: ${({ backgroundColor }) => backgroundColor};
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
// import CustomHomeIcon from "../assets/CustomHomeIcon.png";

// function MissonPage() {
//   return (
//     <div>
//       {/* 페이지 내용 */}
//       <TapBar 
//          icons={{ home: CustomHomeIcon }} 
//          backgroundColor="#FFF0E0"
//        />
//     </div>
//   );
// }
