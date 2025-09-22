import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import ProfileIcon from '../../PostItem/assets/ProfileIcon.png';
import LikedIcon from "../../PostItem/assets/LikedIcon.png";
import CommentIcon from "../../PostItem/assets/CommentIcon.png";

const PostListItem = ({ post, userId }) => {
  const navigate = useNavigate();

  const formatCount = (count) => (count > 999 ? "999+" : count);

  const handleClick = () => {
  navigate(`/community/post/${post.postId}`, { 
    state: { 
      memberId: post.memberId,
      location: post.location,
      fromCommunity: true, // 커뮤니티에서 왔음을 표시
      userId:userId
    } 
  });
};



  return (
    <Wrapper onClick={handleClick}>
      <ContentBox>
        <TextBox>
          <Title>{post.title}</Title>
          <Content>{post.content}</Content>
        </TextBox>
        {post.photoUrl && <Image src={post.photoUrl} alt="본문 이미지" />}
      </ContentBox>
      {post.profileImageUrl && <OverlapImage src={post.profileImageUrl} alt="겹치는 이미지" />}
      <LikedBox>
        <Box>
          <Icon src={LikedIcon} />
          <Count>{formatCount(post.heartCount)}</Count>
        </Box>
        <Box>
          <Icon src={CommentIcon} />
          <Count>{formatCount(post.commentCount)}</Count> 
        </Box>
      </LikedBox>
    </Wrapper>
  );
};

export default PostListItem;

// Styled Components
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; 
  position: relative;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px -1px 6px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  cursor: pointer;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 5.5rem;
  padding: 1rem 1.3rem 0 1.3rem;
`;

const TextBox = styled.div`  /* <p> -> <div> 변경 */
  width: 70%;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.2rem;
`;

const Title = styled.p`
  text-align: start;
  margin: 0;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  line-height: 20px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Content = styled.p`
  text-align: start;
  font-size: 0.65rem;
  color: #7F7F7F;
  margin: 0;
  letter-spacing: -0.5px;
  line-height: 1.2em;
  max-height: 2.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
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
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 1.3rem;
  background-color: #ECEAFF;
  gap: 1rem;
`;

const OverlapImage = styled.img`
  position: absolute;
  top: calc(100% - 3.4rem);
  left: 10%;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  border: 4px solid #ECEAFF;
  object-fit: cover;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.3rem;
`;

const Icon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  object-fit: contain;
`;

const Count = styled.span`
  font-size: 0.75rem;
  color: #7F7F7F;
`;
