import React from 'react';
import styled from 'styled-components';

const Post = ({ title, content, photoUrl }) => {
  return (
    <Container>
      <FixedTop>
        {photoUrl && <Image src={photoUrl} alt="포스트 이미지" />}
        <Title>{title}</Title>
      </FixedTop>
      <ScrollContent>
        <Content>{content}</Content>
      </ScrollContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 74%;
  min-height: 20vh;       /* 최소 높이 */
  max-height: 40vh;       /* 최대 높이 */
  padding: 1.5rem;
  background-color: white;
  border-radius: 16px;
  border: 1px solid #6F69B0;
  gap: 0.4rem;
`;

const FixedTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const ScrollContent = styled.div`
  width: 100%;
  flex: 1 1 auto;       /* 남은 공간 채움 */
  overflow-y: auto;
  padding-bottom: 0;   
`;

const Image = styled.img`
  width: 100%;
  max-height: 170px;    /* 이미지 최대 높이 제한 */
  max-width: 280px;
  border-radius: 9px;
  object-fit: cover;
  display: block;
`;

const Title = styled.div`
  font-size: 0.8rem;
  font-weight: 550;
  letter-spacing: -0.5px;
  text-align: start;
`;

const Content = styled.div`
  color: #909090;
  font-size: 0.7rem;
  line-height: 1.4rem;
  text-decoration: underline;
  text-underline-offset: 5px;
  text-decoration-thickness: 0.05rem;
  letter-spacing: -0.5px;
  margin: 0;      
  text-align: start;
`;

export default Post;
