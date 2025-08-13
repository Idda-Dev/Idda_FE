import React from "react";
import { useNavigate } from "react-router-dom";
import { Column, Row } from "../components/CommonComponents";

const MainPage = () => {
  const nav = useNavigate();

  const handleMissionPage = () => {
    nav("/mission");
  };

  const handleShopPage = () => {
    nav("/shop");
  };

  const handleCommunityPage = () => {
    nav("/community");
  };

  const handleTestPage = () => {
    nav("/test");
  };

  return (
    <div>
      <Column>
        <div>메인페이지입니다</div>
        <div>안녕</div>
      </Column>
      <div style={{ height: "100%" }} />
      <button onClick={handleMissionPage}>미션페이지로 이동하기</button>
      <button onClick={handleShopPage}>상점페이지로 이동하기</button>
      <button onClick={handleCommunityPage}>커뮤니티페이지로 이동하기</button>
      <button onClick={handleTestPage}>테스트로 이동하기</button>
    </div>
  );
};

export default MainPage;
