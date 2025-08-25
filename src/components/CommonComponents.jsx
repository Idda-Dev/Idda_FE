import styled from "styled-components";

// 앱웹 사이즈 기본 도화지 : AppContainer
export const AppContainer = styled.div`
  border: 1px solid black;
  height: 100vh;
  width: 390px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row; /* 혹시 기본값이 바뀔 경우 대비 */
  align-items: center; /* 교차축 기본 중앙 정렬 → stretch 방지 */
  min-width: 0; /* 내부 flex 아이템 줄바꿈/줄임표 가능하게 */
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0; /* 자식이 넘칠 때 깨짐 방지 */
`;
