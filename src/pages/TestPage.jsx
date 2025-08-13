import React from "react";
import Drawer from "../features/Drawer/Drawer";
import styled from "styled-components";

const TestPage = () => {
  return (
    <>
      {/* <div style={{ height: "30vh" }} />
      <img style={{ width: "90%" }} src="public/models/drawer.png" /> */}
      <CanvasSlot>
        <Drawer />
      </CanvasSlot>
    </>
  );
};

export default TestPage;

const CanvasSlot = styled.div`
  align-self: stretch; /* 부모 align-items: flex-start 무시하고 가로폭 꽉 채움 */
  flex: 1 1 0; /* 남은 세로 공간 전부 차지 */
  min-height: 0; /* flex 오버플로 방지 (중요) */
  position: relative; /* 필요시 절대배치용 기준 */
  display: flex; /* 내부 100% 채우기 안정화 */
`;
