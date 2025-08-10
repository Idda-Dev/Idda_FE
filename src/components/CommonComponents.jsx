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
`;

export const Row = styled.div`
  display: flex;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
