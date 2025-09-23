import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/PretendardVariable.ttf') format('truetype-variations');
    font-weight: 100 900; /* 100~900 범위 사용 가능 */
    font-style: normal;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: center;
    margin: 0;
    padding: 0;
    min-height: 100dvh;
    background-color: white;
    font-family: 'Pretendard', sans-serif;
  }


  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #9a9a9a;
    width: 2px;
  }

  &::-webkit-scrollbar {
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-track {
    background-color: #ffffff;
  }

  /* 폰트 스타일 */
  .h1 { font-weight: 700; font-size: 22px; line-height: 30px; }
  .h2 { font-weight: 700; font-size: 18px; line-height: 26px; }
  .h3 { font-weight: 600; font-size: 16px; line-height: 22px; }

  .body1 { font-weight: 500; font-size: 16px; line-height: 22px; }
  .body2 { font-weight: 500; font-size: 14px; line-height: 20px; }

  .caption1 { font-weight: 400; font-size: 12px; line-height: 18px; }
  .caption2 { font-weight: 400; font-size: 11px; line-height: 18px; }

  .button1 { font-weight: 600; font-size: 16px; line-height: 24px; }
  .button2 { font-weight: 600; font-size: 14px; line-height: 20px; }
  .button3 { font-weight: 600; font-size: 12px; line-height: 18px; }
`;

export default GlobalStyle;
