import React from "react";
import styled from "styled-components";

import StarIcon from "../assets/StarIcon.png";
import PostImg from "../assets/PostImg.png";
import BookMarkIcon from "../assets/BookMarkIcon.png";

const Record = () => {
  return (
    <Container>
      <Wrapper>
        <Star src={StarIcon} />
        <TimeWrapper>
          <Time>2025.08.15 (화)</Time>
          <BookMark src={BookMarkIcon} alt="bookmark" />
        </TimeWrapper>
      </Wrapper>
      <Img src={PostImg} />
      <Title>근처 도서관에서 책 2권 빌리기</Title>
      <Content>
        도서관 마감시간에 다녀왔는데 사람이 없어서 좋았고 편하게 다닐 수 있어서
        좋았어요.
      </Content>
    </Container>
  );
};

export default Record;

const Container = styled.div`
  background-color: #d1cdff;
  border-radius: 16px;
  width: 100%;
  height: 100%;
  padding: 0.8rem 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.6rem;
`;
const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: relative;
`;

const BookMark = styled.img`
  width: 3.3rem;
  height: auto;
  position: absolute;
  top: 0%.8; // 위로 올라오게 조정
  right: -5.7rem; // Time 오른쪽에 살짝 떨어지게 조정
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5%;
  height: 9%;
  width: 100%;
`;
const Star = styled.img`
  height: 70%;
  width: auto;
`;
const Time = styled.p`
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: -0.5px;
  line-height: 20px;
`;
const Img = styled.img`
  padding-top: 0.4rem;
  width: 95%;
  height: auto;
`;
const Title = styled.p`
  margin: 0;
  text-align: start;
  font-size: 0.75rem;
  display: -webkit-box; /* 플렉스 박스 대신 클램핑용 박스 */
  -webkit-line-clamp: 1; /* 최대 2줄 */
  -webkit-box-orient: vertical; /* 세로 방향 */
  overflow: hidden; /* 넘치는 내용 숨기기 */
  text-overflow: ellipsis; /* 말줄임표 */
`;
const Content = styled.p`
  margin: 0;
  text-align: start;
  font-size: 0.7rem;
  color: #444444;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  letter-spacing: -0.5px;
  line-height: 20px;
  text-decoration-line: underline;
  text-underline-offset: 0.2rem; /* 글자와 밑줄 사이 간격 */
  text-decoration-color: #444444; /* 밑줄 색상 */
`;
