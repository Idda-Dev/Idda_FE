import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Pretendard-Bold';
    src: url('/fonts/Pretendard-Bold.ttf');
  }
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('/fonts/Pretendard-Regular.ttf');
  }
  @font-face {
    font-family: 'Pretendard-SemiBold';
    src: url('/fonts/Pretendard-SemiBold.ttf');
  }
  @font-face {
    font-family: 'Pretendard-Medium';
    src: url('/fonts/Pretendard-Medium.ttf');
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
  min-height: 100vh;
  background-color: white;
  }

  // 최상위 페이지 컴포넌트에 대해 모바일 웹 환경 구축

  .InitProcess, .Ttokttok, .MyPage{
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  margin: 0;
  min-height: 100vh;
  background-color: white;
  }

  .MainProcess{
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  margin: 0;
  min-height: 100vh;
  background-color: #F5F6F6;
  overflow-y: auto;
  padding-bottom: 100px;
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
  
  // font 종류
.h1 {
  font-family:'Pretendard-Bold';
  font-size: 22px;
  line-height: 30px;
}

.h2 {
  font-family:'Pretendard-Bold';
  font-size: 18px;
  line-height: 26px;
}

.h3 {
  font-family:'Pretendard-SemiBold';
  font-size: 16px;
  line-height: 22px;
}


.body1 {
  font-family:'Pretendard-Medium';
  font-size: 16px;
  line-height: 22px;
}

.body2 {
  font-family:'Pretendard-Medium';
  font-size: 14px;
  line-height: 20px;
}

.caption1 {
  font-family:'Pretendard-Regular';
  font-size: 12px;
  line-height: 18px;
}

.caption2 {
  font-family:'Pretendard-Regular';
  font-size: 11px;
  line-height: 18px;
}

.button1 {
  font-family:'Pretendard-SemiBold';
  font-size: 16px;
  line-height: 24px;
}

.button2 {
  font-family:'Pretendard-SemiBold';
  font-size: 14px;
  line-height: 20px;
}

.button3 {
  font-family:'Pretendard-SemiBold';
  font-size: 12px;
  line-height: 18px;
}


`;

export default GlobalStyle;
