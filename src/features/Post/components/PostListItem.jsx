import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import ProfileIcon from '../../PostItem/assets/ProfileIcon.png';
import LikedIcon from "../../PostItem/assets/LikedIcon.png";
import CommentIcon from "../../PostItem/assets/CommentIcon.png";

const PostListItem = ({ post }) => {
  const navigate = useNavigate();

  const formatCount = (count) => (count > 999 ? "999+" : count);

  const handleClick = () => {
    navigate(`/community/post/${post.postId}`);
  };

  return (
    <Wrapper onClick={handleClick}>
      <ContentBox>
        <TextBox>
          <Title>{post.title}</Title>
          <Content>{post.content}</Content>
        </TextBox>
        <Image src={post.photoUrl} alt="본문 이미지" />
      </ContentBox>
      <OverlapImage src={post.profileImageUrl} alt="겹치는 이미지" />
      <LikedBox>
        <Box>
          <Icon1 src={LikedIcon} />
          <Count>{formatCount(post.likes)}</Count>
        </Box>
        <Box>
          <Icon2 src={CommentIcon} />
          <Count>0</Count> {/* 댓글 수가 없으면 0 */}
        </Box>
      </LikedBox>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; 
  position: relative;
  margin-bottom: 13px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px -1px 6px rgba(0, 0, 0, 0.06);
  overflow: hidden; /* <- 둥근 모서리 바깥으로 안 나가게 */
  cursor: pointer;
`;


const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 5.5rem;
  padding: 0 1.3rem ;
  padding-top: 1rem;
`;

const TextBox = styled.p`
  width: 70%;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0;
  gap:0.2rem;
`;

const Title = styled.p`
  text-align: start;
  margin: 0;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  line-height: 20px;
  width: 100%;
  white-space: nowrap;        /* 줄바꿈 금지 */
  overflow: hidden;           /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis;    /* ... 표시 */
`;

const Content = styled.p`
  text-align: start;
  font-size: 0.65rem;
  color: #7F7F7F;
  margin: 0;
  letter-spacing: -0.5px;
  line-height: 1.2em;
  max-height: 2.4em;          /* 2줄까지만 보이도록 */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;      /* 2줄로 제한 */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;


const Image = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  object-fit: cover;
`;

const LikedBox = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 끝 정렬 */
  align-items: center;
  padding: 0.5rem 1.3rem;
  background-color: #ECEAFF;
  gap: 1rem; /* Box 간 간격 */
`;

const OverlapImage = styled.img`
  position: absolute;
  top: calc(100% - 3.4rem); /* Content와 Count 경계선 위로 살짝 올리기 */
  left: 10%; /* 왼쪽으로 조금 위치 조정 */
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  border: 4px solid #ECEAFF;
  object-fit: cover;
`;


const Box = styled.div`
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: space-between; /* 이미지와 카운트 사이 스페이스 */
  height: 100%;
  gap: 0.3rem; /* 이미지와 숫자 간 간격 */
`;
const Icon1 = styled.img`
  width: 1.1rem;
  height: 1.1rem;
  object-fit: contain;
`;
const Icon2 = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  object-fit: contain;
`;

const Count = styled.span`
  font-size: 0.75rem;
  color: #7F7F7F;
`;
export default PostListItem;
