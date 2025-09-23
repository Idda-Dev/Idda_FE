import { Outlet, useLocation, useMatch } from "react-router-dom";
import { AppContainer } from "./components/CommonComponents";
import TabBar from "./components/TabBar";

function App() {
  const location = useLocation();
  // 패턴 매칭: /community/post/:postId
  const isPostDetail = useMatch("/community/post/:postId");

  // 문자열 완전 일치로 숨길 경로들
  const hideExactRoutes = [
    "/",
    "/login",
    "/test",
    "/typeInfo",
    "/serviceInfo1",
    "/serviceInfo1/serviceInfo2",
  ];

  const shouldHideTabBar =
    !!isPostDetail || hideExactRoutes.includes(location.pathname);

  return (
    <AppContainer>
      <Outlet />
      {!shouldHideTabBar && <TabBar />}
    </AppContainer>
  );
}

export default App;
