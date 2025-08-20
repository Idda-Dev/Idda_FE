import React from 'react'
import styled from 'styled-components';
import PostImage from "../assets/PostImage.png";

const Post = ({title, content, photoUrl}) => {
  return (
    <Container>
      <FixedTop>
        <Image src={photoUrl} alt="포스트 이미지"/>
        <Title>{title}</Title>
      </FixedTop>
      <ScrollContent>
        <Content>
          {content}
          {/* 내용이 길어지면 여기서 스크롤 */}
        </Content>
      </ScrollContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 22px 28px;
  background-color: white;
  border-radius: 16px;
  border: 1px solid #6F69B0;
  width: 74%;
  max-height: 40vh;      /* 컨테이너 최대 높이 */
  gap: 0.4rem;
`;

const FixedTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const ScrollContent = styled.div`
  width: 100%;
  overflow-y: auto;
  /* 컨테이너 패딩 영역 침범하지 않도록 패딩 없음 */
`;

const Image = styled.img`
  width: 80%;
  border-radius: 9px;
`;

const Title = styled.p`
  font-size: 0.8rem;
  font-weight: 550;
  margin: 0;
  text-align: left;
  letter-spacing: -0.5px; 
`;

const Content = styled.p`
  color:#909090;
  font-size: 0.7rem;
  margin: 0;
  text-align: left;
  line-height: 1.4rem;       
  text-decoration: underline;      /* 각 줄 밑줄 */
  text-underline-offset: 5px;      /* 글자에서 밑줄 떨어지는 거리 */
  text-decoration-thickness: 0.05rem;  /* 밑줄 두께 */
  letter-spacing: -0.5px;  
`;

export default Post;
