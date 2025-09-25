import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Profile from "../components/Profile";
import Post from "../components/Post";
import Liked from "../components/Liked";
import CommentList from "../components/CommentList";
import CommentInput from "../components/CommentInput";
import Header from "../../../components/Header";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PostItemPage = () => {
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // state에서 userId 받기
  const { memberId, userId } = location.state || {};
  const numericPostId = Number(postId);

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // 유저 정보 조회
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!BASE_URL || !userId) return;
      try {
        const res = await axios.get(`${BASE_URL}/api/users/${userId}`);
        setUserInfo(res.data);
      } catch (err) {
        console.error("유저 정보 API 실패", err);
        setUserInfo(null);
      }
    };
    fetchUserInfo();
  }, [userId]);

  // 게시글 조회
  useEffect(() => {
    const fetchPost = async () => {
      if (!BASE_URL || !memberId) return;
      try {
        const res = await axios.get(
          `${BASE_URL}/api/missions/users/${memberId}/posts/${numericPostId}`
        );
        setPost(res.data);
      } catch (err) {
        console.error("게시글 API 실패", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [memberId, numericPostId]);

  // 댓글 조회
  const fetchComments = useCallback(async () => {
    if (!BASE_URL) return;
    try {
      const res = await axios.get(`${BASE_URL}/api/posts/${numericPostId}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("댓글 API 실패", err);
      setComments([]);
    }
  }, [numericPostId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // 키보드 체크
  useEffect(() => {
    let initialHeight = window.innerHeight;
    const handleResize = () => {
      setIsKeyboardOpen(initialHeight - window.innerHeight > 150);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 댓글 추가
  const handleCommentAdded = (comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  // 댓글 수정
  const handleCommentUpdated = (updatedComment) => {
    setComments((prev) =>
      prev.map((c) => (c.commentId === updatedComment.commentId ? updatedComment : c))
    );
  };

  // 댓글 삭제
  const handleCommentDeleted = (deletedCommentId) => {
    setComments((prev) => prev.filter((c) => c.commentId !== deletedCommentId));
  };

  if (loading) return <div>로딩중...</div>;
  if (!post) return <div>데이터가 없습니다.</div>;

  return (
    <Container>
      <Header
        title="다같이 한걸음"
        userId={userId}
        backPath={() => {
          if (location.state?.fromCommunity) {
            navigate(`/community?location=${post.location}`, { state: { userId } });
          } else {
            navigate(-1);
          }
        }}
      />

      <FixedArea>
        <Profile
          nickname={post.nickname}
          profileImageUrl={post.profileImageUrl}
          time={post.createdAt}
        />
        <Post title={post.title} content={post.content} photoUrl={post.photoUrl} />
        <Liked heartCount={post.heartCount} commentCount={comments.length} postId={numericPostId} />
      </FixedArea>

      <ScrollArea>
        <CommentList
          comments={comments}
          userId={userId}
          onCommentChange={(updatedOrDeleted, type) => {
            if (type === "update") handleCommentUpdated(updatedOrDeleted);
            if (type === "delete") handleCommentDeleted(updatedOrDeleted);
          }}
        />
      </ScrollArea>

      <CommentInputWrapper $isKeyboardOpen={isKeyboardOpen}>
        <CommentInput
          postId={numericPostId}
          userId={userId}
          userNickname={userInfo?.nickname || ""}
          userProfileImageUrl={userInfo?.profileImageUrl || ""}
          onCommentAdded={handleCommentAdded}
          refreshComments={fetchComments}
        />
      </CommentInputWrapper>
    </Container>
  );
};

export default PostItemPage;

// Styled Components
const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 100%;
  background-color: #f8faff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FixedArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 0.4rem;
`;

const ScrollArea = styled.div`
  flex: 1 1 auto;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.3rem;
  padding-bottom: 56px;
`;

const CommentInputWrapper = styled.div`
  position: ${({ $isKeyboardOpen }) =>
    $isKeyboardOpen ? "fixed" : "absolute"};
  bottom: 0;
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  background: #fff;
  max-width: inherit;
`;
