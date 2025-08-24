import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

import Profile from "../components/Profile";
import Post from "../components/Post";
import Liked from "../components/Liked";
import CommentList from "../components/CommentList";
import CommentInput from "../components/CommentInput";
import Header from "../../../components/Header";

import { post as mockPost } from "../../../mocks/post";
import { comments as mockComments } from "../../../mocks/comments";
import { userinfo as fallbackUser } from "../../../mocks/userinfo";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PostItemPage = () => {
  const { postId } = useParams();
  const numericPostId = Number(postId);

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [userInfo, setUserInfo] = useState(fallbackUser);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  //유저 정보 조회
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!BASE_URL) return;
        const res = await axios.get(`${BASE_URL}/api/users/${userInfo.memberId}`);
        setUserInfo(res.data);
      } catch (err) {
        console.warn("유저 정보 API 실패 → fallback 사용", err);
        setUserInfo(fallbackUser);
      }
    };
    fetchUserInfo();
  }, []);

  // 게시글 조회
  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!BASE_URL) {
          setPost(mockPost);
          return;
        }
        const res = await axios.get(`${BASE_URL}/api/missions/users/${userInfo.memberId}/posts/${numericPostId}`);
        setPost(res.data);
      } catch (err) {
        console.warn("게시글 API 실패 → fallback 사용", err);
        setPost(mockPost);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [numericPostId, userInfo]);

  // 댓글 조회 
  const fetchComments = async () => {
    try {
      if (!BASE_URL) {
        setComments(mockComments);
        return;
      }
      const res = await axios.get(`${BASE_URL}/api/posts/${numericPostId}/comments`);
      setComments(res.data);
    } catch (err) {
      console.warn("댓글 API 실패 → fallback 사용", err);
      setComments(mockComments);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [numericPostId]);

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
  const handleCommentAdded = (newComment) => {
    setComments(prev => [newComment, ...prev]);
  };

  // 댓글 수정
  const handleCommentUpdated = (updatedComment) => {
    setComments(prev => prev.map(c => c.commentId === updatedComment.commentId ? updatedComment : c));
  };

  // 댓글 삭제
  const handleCommentDeleted = (deletedCommentId) => {
    setComments(prev => prev.filter(c => c.commentId !== deletedCommentId));
  };

  

  if (loading) return <div>로딩중...</div>;
  if (!post) return <div>데이터가 없습니다.</div>;

  return (
    <Container>
      <Header title="다같이 한걸음" backPath={"/community"} />
      <ScrollArea>
        <Profile nickname={post.nickname} profileImageUrl={post.profileImageUrl} time={post.createdAt} />
        <Post title={post.title} content={post.content} photoUrl={post.photoUrl} />
        <Liked heartCount={post.heartCount} commentCount={post.commentCount} postId={numericPostId}/>
        <CommentList 
          comments={comments} 
          userId={userInfo.memberId} 
          onCommentChange={(updatedOrDeleted, type) => {
            if(type === 'update') handleCommentUpdated(updatedOrDeleted);
            if(type === 'delete') handleCommentDeleted(updatedOrDeleted);
          }}
        />
      </ScrollArea>

      <CommentInputWrapper $isKeyboardOpen={isKeyboardOpen}>
        <CommentInput 
          postId={numericPostId} 
          userId={userInfo.memberId} 
          userNickname={userInfo.nickname}
          userProfileImageUrl={userInfo.profileImageUrl}
          onCommentAdded={handleCommentAdded} 
        />
      </CommentInputWrapper>
    </Container>
  );
};

export default PostItemPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 100%;
  background-color: #F8FAFF;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScrollArea = styled.div`
  flex: 1 1 auto;
  padding-top: 3.5rem;
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
  position: ${({ $isKeyboardOpen }) => ($isKeyboardOpen ? "fixed" : "absolute")};
  bottom: 0;
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  background: #fff;
`;
