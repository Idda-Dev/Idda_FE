import { Outlet } from "react-router-dom";
import { AppContainer } from "./components/CommonComponents";
import TabBar from "./components/TabBar";
import PurpleHomeIcon from "./assets/PurpleHomeIcon.png"; // 필요하면 커스텀 아이콘
import styled from "styled-components";

function App() {
  return (
    <div>
      <AppContainer>
        <MainArea>
          {/* ▼ 하단에 공간 예약 */}
          <Outlet />
        </MainArea>
        <TabBar
          icons={{ home: PurpleHomeIcon }}
          backgroundColor="rgba(255,255,255,0.9)"
        />
      </AppContainer>
    </div>
  );
}

export default App;

const MainArea = styled.div`
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  /* 탭바 높이 + 안전영역만큼 바텀 패딩을 줘서 콘텐츠가 가려지지 않게 */
  padding-bottom: calc(60px + env(safe-area-inset-bottom));
  overflow: auto;
`;
