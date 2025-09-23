import { Outlet, useLocation } from "react-router-dom";
import { AppContainer } from "./components/CommonComponents";
import TabBar from "./components/TabBar";
import styled from "styled-components";

function App() {
  const location = useLocation();

  // 탭바를 숨기고 싶은 경로들
  const hideTabBarRoutes = [
    "/",
    "/login",
    "/test",
    "/typeInfo",
    "/serviceInfo1",
    "/serviceInfo1/serviceInfo2",
  ];

  const shouldHideTabBar = hideTabBarRoutes.includes(location.pathname);

  return (
    <AppContainer>
      <Outlet />
      {!shouldHideTabBar && <TabBar />} {/* ✅ 조건부 렌더링 */}
    </AppContainer>
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
