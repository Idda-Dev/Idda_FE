import React from "react";
import { Column, Row } from "../components/CommonComponents";
import styled from "styled-components";
import TabBar from "../components/TabBar";
import PurpleHomeIcon from "../assets/PurpleHomeIcon.png";

const MainPage = () => {
  return (
    <Container>
      <div>
        <Column>
          <div>메인페이지입니다</div>
        </Column>
        <div style={{ height: "100%" }} />
      </div>
      <TabBar icons={{ home: PurpleHomeIcon }} />
    </Container>
  );
};

export default MainPage;

// 탭바 전용 컨테이너
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;
