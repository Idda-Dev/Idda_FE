import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Profile from "../components/Profile";
import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList";
import Post from "../components/Post";
import Header from "../../../components/Header";
import Liked from "../components/Liked";
import axios from "axios";
import { post as mockPost } from "../../../mocks/post"; // ✅ 목데이터 import

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PostItemPage = ({ userId = 1, postId}) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let initialHeight = window.innerHeight;

    const handleResize = () => {
      const heightDiff = initialHeight - window.innerHeight;
      setIsKeyboardOpen(heightDiff > 150);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!BASE_URL) {
          console.warn("⚠️ BASE_URL 없음 → 목데이터 사용");
          setPost(mockPost);
          return;
        }

        const res = await axios.get(
          `${BASE_URL}/api/users/${userId}/missions/posts/${postId}`
        );

        setPost(res.data);
      } catch (err) {
        console.error("API 호출 실패 → 목데이터 사용:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [userId, postId]);

  if (loading) return <div>로딩중...</div>;
  if (!post) return <div>데이터가 없습니다.</div>;

  return (
    <Container>
      <Header title="다같이 한걸음" backPath={"/community"} />
      <ScrollArea>
        <Profile nickname={post.nickname} profileImageUrl={post.profileImageUrl} time={post.createdAt}/>
        <Post title={post.title} content={post.content} photoUrl={post.photoUrl} />
        <Liked heartCount={post.heartCount} commentCount={post.commentCount} />
        <CommentListWrapper>
          <CommentList postId={post.postId} />
        </CommentListWrapper>
      </ScrollArea>

      {/* CommentInput 고정 */}
      <CommentInputWrapper isKeyboardOpen={isKeyboardOpen}>
        <CommentInput postId={post.postId} />
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
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  padding-bottom: 56px;
`;

const CommentInputWrapper = styled.div`
  position: ${({ isKeyboardOpen }) => (isKeyboardOpen ? "fixed" : "absolute")};
  bottom: 0;
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  background: #fff;
`;

const CommentListWrapper = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
`;


